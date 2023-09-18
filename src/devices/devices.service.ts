import { Injectable, NotFoundException } from '@nestjs/common';
import { DevicesRepository } from './devices.repository';

import epochSecondsToDateString from './helpers/epochToDate';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(private readonly devicesRepository: DevicesRepository) {}

  newLocation(deviceId: number, deviceHexData: string) {
    //Converting the values composition from hex to a binary
    const values_composition = parseInt(
      deviceHexData.slice(28, 32),
      16,
    ).toString(2);

    const device = new Device(
      deviceId,
      epochSecondsToDateString(deviceHexData.slice(0, 8)),
      parseInt(deviceHexData.slice(8, 12), 16) % 360,
      parseInt(deviceHexData.slice(12, 20), 16),
      parseInt(deviceHexData.slice(20, 28), 16),
      values_composition[0] === '1',
      values_composition[1] === '1',
      values_composition[2] === '1',
      values_composition[3] === '1',
      values_composition[4] === '1',
      parseInt(deviceHexData.slice(-18, -16), 16),
      parseInt(deviceHexData.slice(-16, -8), 16) / 10 ** 6,
      parseInt(deviceHexData.slice(-8), 16) / 10 ** 6,
    );

    this.devicesRepository.insertLocation(device);
  }

  getDeviceLocation(deviceId: number) {
    const device = this.devicesRepository.findLocationByDeviceId(deviceId);
    if (!device) throw new NotFoundException('Device was not found');
    return device;
  }
}
