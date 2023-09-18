import { Injectable } from '@nestjs/common';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesRepository {
  private devices: Device[] = [
    new Device(
      671603,
      '2020-07-01T18:00:00',
      54.87,
      25000000,
      36000,
      true,
      true,
      true,
      true,
      true,
      60,
      19.932833,
      43.938493,
    ),
  ];

  insertLocation(device: Device) {
    this.devices.unshift(device);
  }

  findLocationByDeviceId(deviceId: number) {
    return this.devices.find((d) => d.id === deviceId);
  }
}
