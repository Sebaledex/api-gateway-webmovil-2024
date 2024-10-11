import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import { tokenType, UserMSG } from 'src/common/constants';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { LoginUserDto, RegisterUserDto } from 'src/user/dto/user.dto';

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

  async login({ email, password }: LoginUserDto) {
    console.log('Login', email);
    try {
      const user = await firstValueFrom(
        this._clientProxyUser.send(UserMSG.FIND_ONE, email),
      );

      console.log('User', user);

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

  async register(registerDto: RegisterUserDto) {
    const result = await firstValueFrom(
      this._clientProxyUser.send(UserMSG.CREATE, registerDto),
    );
    return result;
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await firstValueFrom(
        this._clientProxyUser.send(UserMSG.FIND_ONE, payload.email),
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
