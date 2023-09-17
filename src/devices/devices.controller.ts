import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('/api/v1')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('/location/:device_id')
  getDeviceLocation(@Param('device_id', ParseIntPipe) deviceId: number) {
    return this.devicesService.getDeviceLocation(deviceId);
  }
}
