<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Softracker

This is an architecture receives points from trackers and provide an endpoint where the last location of a specific tracker can be consulted.
A TCP connection is opened within the server and then the tracker sends location data through it. Later on, users can send a request to the server and then all data captured by the tracker will be retrieved.

## Setup
Creating a .env file in the project's root is highly recommended, as you can customize the ports you want the server to use.

Values to be defined:

PORT: This is the port in which the server will run

TCP_PORT: This is the port in which the server will open the TCP connection

If they are not defined, the API will use default values: 3000 for PORT and 8080 for TCP_PORT

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

## Test

```bash
# e2e tests
$ npm run test:e2e
```

IMPORTANT: Please note that the server must be operating before running the tests

## If you want to test it manually

Follow the commands below and change the values inserted as you like, as long as they are covered by the server requirements.

1. Send a Heartbeat request to the server
```bash
$ echo -n 50F70A3F730150494E4773C4 | xxd -r -p | nc -v localhost 8080
```

2. The server will respond with a Ping ACK message:
```bash
$ 50F70150494E4773C4
```

3. Send a Location request to the server
```bash
$ echo -n 50F70A3F73025EFCF950156F017D784000008CA0F80084003C013026A1029E72BD73C4 | xxd -r -p | nc -v localhost 8080
```

4. The server will respond with the following message:
```bash
$ Location acquired
```

5. Send a request to the GET /api/v1/location/:device_id route, in which device_id is the id of the device you sent in step 3, but now in its decimal form.

6. The object retrieved from the request should look like this:
   
{

    "_id": 671603,
    
    "_date": "2020-07-01T18:00:00",
    
    "_direction": 87,
    
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

## Project structure

## Next steps
