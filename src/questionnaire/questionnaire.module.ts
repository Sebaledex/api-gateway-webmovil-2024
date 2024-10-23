import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [QuestionnaireController],
})
export class QuestionnaireModule {}
