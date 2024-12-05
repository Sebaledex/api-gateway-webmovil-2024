import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RespuestaDTO } from './dto/respuesta.dto'; // Asegúrate de tener definido el DTO para respuesta
import { RespuestaMsg } from 'src/common/constants'; // Asegúrate de tener definidos los mensajes para Rabbit
import { IResponse } from 'src/common/interfaces/respuesta.interface';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';

@ApiTags('respuesta')
//@UseGuards(JwtAuthGuard)
@Controller('api/v2/respuesta')
export class RespuestaController {
  constructor(private readonly clientProxy: ClientProxyWebMovil) {}
  private _clientProxyRespuesta = this.clientProxy.clientProxyRespuestas();

  @Post(':userId/:questionnaireId')
  create(
    @Param('userId') usuarioId: string,
    @Param('questionnaireId') cuestionarioId: string,
    @Body() respuestaDTO: RespuestaDTO): Observable<IResponse> {

    // Agregar información adicional al payload como patente, fecha_respuesta y geolocalización
    const payload = {
      respuestaDTO,
      usuarioId,
      cuestionarioId,
      patente: respuestaDTO.patente, // La patente se espera que venga en el DTO
      fecha_respuesta: new Date(), // Se registra la fecha y hora actual
      geolocalizacion: respuestaDTO.geolocalizacion, // Geolocalización desde el DTO
    };

    return this._clientProxyRespuesta.send(RespuestaMsg.CREATE, payload);
  }

  @Get()
  findAll(): Observable<IResponse[]> {
    return this._clientProxyRespuesta.send(RespuestaMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IResponse> {
    return this._clientProxyRespuesta.send(RespuestaMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() respuestaDTO: RespuestaDTO): Observable<IResponse> {
    return this._clientProxyRespuesta.send(RespuestaMsg.UPDATE, { id, respuestaDTO });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyRespuesta.send(RespuestaMsg.DELETE, id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Observable<IResponse[]> {
    return this._clientProxyRespuesta.send(RespuestaMsg.FIND_BY_USER, userId);
  }
}