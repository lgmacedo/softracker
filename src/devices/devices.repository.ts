import { Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesRepository {
  private devices: Device[] = [];

  insertLocation(device: Device) {
    this.devices.unshift(device);
  }

  findLocationByDeviceId(deviceId: number) {
    return this.devices.find((d) => d.id === deviceId);
  }
}
