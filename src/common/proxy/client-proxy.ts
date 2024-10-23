import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQ } from '../constants';
import config from 'src/config';

@Injectable()
export class ClientProxyWebMovil {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  clientProxyUsers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.rabbitMQ.amqpUrl],
        queue: RabbitMQ.UserQueue,
      },
    });
  }

  clietProxyQuestionnaire(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.rabbitMQ.amqpUrl],
        queue: RabbitMQ.QuestionnairesQueue,
      },
    });
  }
}
