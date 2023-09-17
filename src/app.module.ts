import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TcpModule } from './tcp/tcp.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [TcpModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
