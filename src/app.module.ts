import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AreaModule } from './area/area.module';
import { QuestionModule } from './question/question.module';

import { RespuestaModule } from './respuesta/respuesta.module';

import { MachineModule } from './machine/machine.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),

    UserModule,AuthModule,AreaModule,QuestionModule,RespuestaModule, MachineModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}