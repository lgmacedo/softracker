import { Module } from '@nestjs/common';
import { TcpService } from './tcp.service';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [DevicesModule],
  providers: [TcpService],
})
export class TcpModule {}
