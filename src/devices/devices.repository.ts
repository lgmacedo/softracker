import { Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesRepository {
  private devices: Device[] = [];

  insertLocation(device: Device) {
    this.devices.unshift(device);

    console.log(this.devices);
  }
}
