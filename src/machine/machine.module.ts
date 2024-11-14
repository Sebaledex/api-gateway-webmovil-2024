import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [MachineController],
})
export class MachineModule {}
