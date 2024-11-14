import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';

import { Observable } from 'rxjs';
import { QuestionsMSG, UserMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { QuestionDTO } from './dto/question.dto';
import { IQuestion } from 'src/common/interfaces/question.interface';


@ApiTags(' Question')
//@UseGuards(JwtAuthGuard)
@Controller('api/v2/question')
export class QuestionController {
    constructor(private readonly clientProxy: ClientProxyWebMovil) {}
    private _clientProxyQuestion = this.clientProxy.clientProxyQuestions();
  
    @Post()
    create( @Body() questionDTO: QuestionDTO): Observable<IQuestion> {
       
      
        const payload = { questionDTO };
        return this._clientProxyQuestion.send(QuestionsMSG.CREATE, payload);
    }
  
    @Get()
    findAll(): Observable<IQuestion[]> {
      return this._clientProxyQuestion.send(QuestionsMSG.FIND_ALL, '');
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Observable<IQuestion> {
      return this._clientProxyQuestion.send(QuestionsMSG.FIND_ONE, id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() questionDTO: QuestionDTO): Observable<IQuestion> {
      return this._clientProxyQuestion.send(QuestionsMSG.UPDATE, { id, questionDTO });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
      return this._clientProxyQuestion.send(QuestionsMSG.DELETE, id);
    }
    @Get(':userId')
    findByUser(@Param('userId') userId: string): Observable<IQuestion[]> {
        return this._clientProxyQuestion.send(QuestionsMSG.FIND_BY_USER, userId);
    }

    
    
  }