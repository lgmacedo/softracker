<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Softracker

Softracker is an architecture designed to receive location data from trackers and provide an endpoint for querying the last known location of specific trackers. It establishes a TCP connection with the trackers, enabling them to transmit location data to the server. Later, users can send requests to retrieve all data captured by the trackers.

## Setup
It is highly recommended to create a `.env` file in the project's root directory, allowing you to customize the server's port configurations.

Values to be defined:

PORT: This is the port in which the server will run.

TCP_PORT: This is the port in which the server will open the TCP connection.

If not defined, the API will use default values: `3000` for `PORT` and `8080` for `TCP_PORT`.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Automated testing

```bash
# e2e tests
$ npm run test:e2e
```

IMPORTANT: Ensure that the server is operational before running the tests.

## Manual testing

To manually test the application, follow the commands below. You can customize the values as needed, as long as they adhere to the server's requirements.

1. Using netcat, send a Heartbeat request to the server
```bash
$ echo -n 50F70A3F730150494E4773C4 | xxd -r -p | nc -v localhost 8080
```

2. The server will respond with a Ping ACK message:
```bash
$ 50F70150494E4773C4
```

3. Using netcat, send a Location request to the server
```bash
$ echo -n 50F70A3F73025EFCF950156F017D784000008CA0F80084003C013026A1029E72BD73C4 | xxd -r -p | nc -v localhost 8080
```

4. The server will respond with the following message:
```bash
$ Location acquired
```

5. Send a request to the GET /api/v1/location/:device_id route, where device_id is the ID of the device you sent in step 3, but in decimal form.

6. The retrieved object should look like this:

```bash
{
    "_id": 671603,
    "_date": "2020-07-01T18:00:00",
    "_direction": 54.87,
    "_distance": 25000000,
    "_time": 36000,
    "_fixed_gps": true,
    "_historic_gps": true,
    "_ignition": true,
    "_negative_latitude": true,
    "_negative_longitude": true,
    "_current_speed": 60,
    "_latitude": 19.932833,
    "_longitude": 43.938493
}
```

## Project structure

The project is structured into the 'src' folder, containing the 'tcp' and 'devices' modules. 'tcp' implements the TcpModule, while 'devices' implements the DevicesModule. NestJS modules provide modularity, maintainability, and reusability. The 'test' folder contains automated test implementations.

![softracker drawio](https://github.com/lgmacedo/softracker/assets/83235488/875a8fd3-51f4-475c-b496-f7ee75882200)

## Next steps

Future enhancements planned for Softracker:

- Implement data storage using a SQL database and Prisma ORM.
- Implement user validation through JWT, associating devices with users to ensure that each device's data can only be accessed by its respective owner.
