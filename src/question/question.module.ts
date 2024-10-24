import { Module } from '@nestjs/common';

import { ProxyModule } from 'src/common/proxy/proxy.module';
import { QuestionController } from './question.controller';

@Module({
  imports: [ProxyModule],
  controllers: [QuestionController]
})
export class QuestionModule {}