import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Obtener el refreshToken desde el cuerpo de la solicitud
    const refreshToken = request.body.refreshToken;
    
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    try {
      // Verifica el refresh token
      const decoded = this.jwtService.verify(refreshToken);
      request.user = { ...decoded, refreshToken };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}