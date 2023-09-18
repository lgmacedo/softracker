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
