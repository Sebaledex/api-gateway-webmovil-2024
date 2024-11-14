import { Module } from '@nestjs/common';

import { ProxyModule } from 'src/common/proxy/proxy.module';
import { RespuestaController } from './respuesta.controller';


@Module({
  imports: [ProxyModule],
  controllers: [RespuestaController]
})
export class RespuestaModule {}