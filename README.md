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
