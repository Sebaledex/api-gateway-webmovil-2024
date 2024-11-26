import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { MaquinaMsg } from 'src/common/constants'; // Define los mensajes de RabbitMQ
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { MachineDTO } from './dto/maquina.dto';
import { IMachine } from 'src/common/interfaces/maquina.interface';


@ApiTags('Machines')
@Controller('api/v2/machines')
export class MachineController {
  constructor(private readonly clientProxy: ClientProxyWebMovil) {}
  private _clientProxyMachine = this.clientProxy.clientProxyMachine();

  @Post()
  create(@Body() machineDTO: MachineDTO): Observable<IMachine> {
    return this._clientProxyMachine.send(MaquinaMsg.CREATE, machineDTO);
  }

  @Get()
  findAll(): Observable<IMachine[]> {
    return this._clientProxyMachine.send(MaquinaMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IMachine> {
    return this._clientProxyMachine.send(MaquinaMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() machineDTO: MachineDTO): Observable<IMachine> {
    return this._clientProxyMachine.send(MaquinaMsg.UPDATE, { id, machineDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyMachine.send(MaquinaMsg.DELETE, id);
  }

  @Get('area/:area')
  findByArea(@Param('area') area: string): Observable<IMachine[]> {
    return this._clientProxyMachine.send(MaquinaMsg.FIND_BY_AREA, area);
  }
}