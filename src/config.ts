import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      port: parseInt(process.env.PORT, 10) || 3000,
      environment: process.env.NODE_ENV || 'development',
      name: process.env.APP_NAME || 'NestJS Microservices',
      version: process.env.APP_VERSION || '1.0.0',
    },
    rabbitMQ: {
      amqpUrl: process.env.AMQP_URL,
    },
    jwt: {
      accessSecret: process.env.ACCESS_JWT_SECRET,
      refreshSecret: process.env.REFRESH_JWT_SECRET,
      accessExpiresIn: process.env.ACCESS_EXPIRES_IN,
      refreshExpiresIn: process.env.REFRESH_EXPIRES_IN,
    },
  };
});
