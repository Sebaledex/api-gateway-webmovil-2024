import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users')
//@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
    constructor(private readonly clientProxy: ClientProxyWebMovil) {}
    private _clientProxyUser = this.clientProxy.clientProxyUsers();
  
    @Post()
    create(@Body() userDTO: UserDTO): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }
  
    @Get()
    findAll(): Observable<IUser[]> {
      return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
      return this._clientProxyUser.send(UserMSG.DELETE, id);
    }
    

  }