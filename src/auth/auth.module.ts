import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import config from 'src/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ProxyModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwt.accessSecret,
        signOptions: {
          expiresIn: configService.jwt.accessExpiresIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
