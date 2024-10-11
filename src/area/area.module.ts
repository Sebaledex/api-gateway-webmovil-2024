import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { AreaController } from './area.controller';


@Module({
  imports:[ProxyModule],
  controllers: [AreaController]
})
export class AreaModule {}
