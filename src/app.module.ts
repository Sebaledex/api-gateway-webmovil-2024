import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
        ACCESS_JWT_SECRET: Joi.string().required(),
        ACCESS_EXPIRES_IN: Joi.string().required(),
        REFRESH_JWT_SECRET: Joi.string().required(),
        REFRESH_EXPIRES_IN: Joi.string().required(),
        AMQP_URL: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
    QuestionnaireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
