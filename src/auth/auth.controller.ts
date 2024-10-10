import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh.guard';

@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }

  @Post('update-jwt')
  @UseGuards(RefreshTokenGuard)
  async updateJWT(@Body() req) {
    try {
      const updatedToken = await this.authService.refresh(req.refreshToken);
      return {
        statusCode: 200,
        success: true,
        message: 'JWT updated succesfully',
        data: updatedToken,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update JWT',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
