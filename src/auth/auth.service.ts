import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { UserDTO, UserLoginDto } from 'src/user/dto/user.dto';
import { tokenType, UserMSG } from 'src/common/constants';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyWebMovil,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await firstValueFrom(
        this._clientProxyUser.send(UserMSG.VALID_USER, {
          username,
          password,
        }),
      );
      return user;
    } catch (error) {
      console.log('Error validating', error);
    }
  }

  async login({ email, password }: UserLoginDto) {
    try {
      const user = await firstValueFrom(
        this._clientProxyUser.send(UserMSG.FIND_ONE, email),
      );

      if (!user) {
        throw new NotFoundException(
          'No existe una cuenta asociada a este correo',
        );
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(
        {
          ...payload,
          type: tokenType.ACCESS,
        },
        {
          expiresIn: process.env.EXPIRES_IN,
        },
      );

      const refreshToken = await this.jwtService.signAsync({
        ...payload,
        type: tokenType.REFRESH,
      });

      const response = {
        statusCode: 200,
        message: 'Login successful',
        success: true,
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          email: user.email,
          role: user.role,
        },
      };

      return response;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return {
          statusCode: 401,
          message: error.message,
          success: false,
        };
      }
      return {
        statusCode: 500,
        message: 'Internal server error',
        success: false,
      };
    }
  }

  async signUp(userDTO: UserDTO) {
    return await this._clientProxyUser
      .send(UserMSG.CREATE, userDTO)
      .toPromise();
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET, // Asegúrate de usar la clave secreta correcta para los refresh tokens
      });

      // const user = await this.usersService.findByEmail(payload.email); // Suponiendo que existe un servicio para buscar usuarios

      //realmente hay que ir a buscar el usuario por el id
      const user = await firstValueFrom(
        this._clientProxyUser.send(UserMSG.FIND_ONE, payload.sub),
      );
      const newToken = this.jwtService.sign(
        {
          username: user.userName,
          sub: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      );
      return newToken;
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
