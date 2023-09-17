import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpService } from './tcp/tcp.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.PORT || 3000;
  const tcpPort = Number(process.env.TCP_PORT) || 8080;

  app.useGlobalPipes(new ValidationPipe());

  const tcpService = app.get(TcpService);
  tcpService.startServer(tcpPort);

  await app.listen(appPort);
  console.log(
    `Application is running on port ${appPort} and TCP connection is up on port ${tcpPort}`,
  );
}
bootstrap();
