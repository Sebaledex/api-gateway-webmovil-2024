
import { Body, Controller, Param, Post, Put, UseGuards,Get,Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import {  AreaDTO, } from './dto/area.dto';
import { AreaMSG } from 'src/common/constants';

import { IArea } from 'src/common/interfaces/area.interface';
@ApiTags('Area')

@Controller('api/v2/area')
export class AreaController {
    logger: any;
    constructor(private readonly clientProxy: ClientProxyWebMovil){}
    private _clientProxyArea = this.clientProxy.clientProxyArea();


    @Post()
    create( @Body() areaDTO: AreaDTO): Observable<IArea> {
       

        const payload = { areaDTO };
        return this._clientProxyArea.send(AreaMSG.CREATE, payload);
    }
    @Get()
    findAll(): Observable<IArea[]>{
        return this._clientProxyArea.send(AreaMSG.FIND_ALL,'');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IArea>{
        return this._clientProxyArea.send(AreaMSG.FIND_ONE,id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() serviceDTO: AreaDTO): Observable<IArea> {
        return this._clientProxyArea.send(AreaMSG.UPDATE, { id, serviceDTO });
    }

    @Delete(':id')
    delete(@Param('id') id:string): Observable<any>{
        return this._clientProxyArea.send(AreaMSG.DELETE,id);
    }
    
    
}

 

