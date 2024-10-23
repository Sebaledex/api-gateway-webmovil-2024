import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxyWebMovil } from 'src/common/proxy/client-proxy';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnaireMsg } from 'src/common/constants';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly clientProxy: ClientProxyWebMovil) {}
  private _clientProxyQuestionnaire =
    this.clientProxy.clietProxyQuestionnaire();

  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {}

  @Get('all')
  findAll() {
    console.log('This action returns all questionnaire');
    return this._clientProxyQuestionnaire.send(QuestionnaireMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
