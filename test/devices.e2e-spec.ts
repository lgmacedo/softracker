import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('DevicesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /api/v1/location/671603 should return status 200 and the correct device location', async () => {
    const response = await request(app.getHttpServer()).get(
      `/api/v1/location/671603`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: 671603,
      _date: '2020-07-01T18:00:00',
      _direction: 54.87,
      _distance: 25000000,
      _time: 36000,
      _fixed_gps: true,
      _historic_gps: true,
      _ignition: true,
      _negative_latitude: true,
      _negative_longitude: true,
      _current_speed: 60,
      _latitude: 19.932833,
      _longitude: 43.938493,
    });
  });

  it('GET /api/v1/location/:device_id should return status 400 when deviceId is not valid', async () => {
    const response = await request(app.getHttpServer()).get(
      `/api/v1/location/thisisnotanumber`,
    );
    expect(response.statusCode).toBe(400);
  });

  it("GET /api/v1/location/:device_id should return status 404 when deviceId doesn't exist", async () => {
    const response = await request(app.getHttpServer()).get(
      `/api/v1/location/999999`,
    );
    expect(response.statusCode).toBe(404);
  });
});
