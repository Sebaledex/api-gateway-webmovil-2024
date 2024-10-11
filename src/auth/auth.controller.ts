import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req) {
    return await this.authService.login({ ...req.body });
  }

  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    return await this.authService.register(userDTO);
  }

  @Post('update-jwt')
  @UseGuards(RefreshTokenGuard)
  async updateJWT(@Request() req) {
    const { refreshToken } = req.body;
    try {
      const updatedToken = await this.authService.refresh(refreshToken);
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
