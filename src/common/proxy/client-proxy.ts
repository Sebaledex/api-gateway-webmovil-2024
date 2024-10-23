import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQ } from '../constants';

@Injectable()
export class ClientProxyWebMovil {
  constructor(private readonly config: ConfigService) {}

  clientProxyUsers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('LOCAL_AMQP_URL'),
        queue: RabbitMQ.UserQueue,
      },
    });
  }

  clietProxyQuestionnaire(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('LOCAL_AMQP_URL'),
        queue: RabbitMQ.QuestionnairesQueue,
      },
    });
  }
}
