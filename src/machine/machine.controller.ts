import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { MachineMSG } from 'src/common/constants';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { MachineDTO } from './dto/machine.dto';

@ApiTags('Machine')
@Controller('api/v2/machine')
export class MachineController {
  private _clientProxyMachine: ClientProxy;
  constructor(private readonly clientProxy: ClientProxyWebMovil) {
    this._clientProxyMachine = this.clientProxy.clientProxyMachine();
  }

  @Get('all')
  async allMachine() {
    return this._clientProxyMachine.send(MachineMSG.FIND_ALL, {});
  }

  @Get('one')
  async oneMachine(@Param('id') id: string) {
    return this._clientProxyMachine.send(MachineMSG.FIND_ONE, id);
  }

  @Post('create')
  async createMachine(data: MachineDTO) {
    return this._clientProxyMachine.send(MachineMSG.CREATE, data);
  }

  @Patch('update')
  async updateMachine(data: MachineDTO) {
    return this._clientProxyMachine.send(MachineMSG.UPDATE, data);
  }

  @Delete('delete')
  async deleteMachine(@Param('id') id: string) {
    return this._clientProxyMachine.send(MachineMSG.DELETE, id);
  }
}
