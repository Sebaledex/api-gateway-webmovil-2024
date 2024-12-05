import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserMSG } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyWebMovil,
    private readonly jwtService: JwtService,
  ) {}

  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  // Valida si el usuario existe y las credenciales son correctas
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, { username, password })
      .toPromise();

    if (user) return user;
    return null;
  }

  // Inicia sesión y genera el access_token y refresh_token
  async signIn(user: any) {

    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '60s' }), // Token de acceso con duración corta
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // Token de refresco con duración más larga
      userId: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      area:user.area,
    };
  }


  async signUp(userDTO: UserDTO) {
    return await this._clientProxyUser
      .send(UserMSG.CREATE, userDTO)
      .toPromise();
  }

  // Refrescar el token de acceso usando el refresh_token
  async refreshToken(refreshToken: string) {
    try {
      // Verifica si el refresh_token es válido
      const payload = this.jwtService.verify(refreshToken);

      // Si es válido, genera un nuevo access_token
      const newAccessToken = this.jwtService.sign({
        username: payload.username,
        sub: payload.sub,
      }, { expiresIn: '15m' });

      const newRefreshToken = this.jwtService.sign({
        username: payload.username,
        sub: payload.sub,
      }, { expiresIn: '7d' });

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}