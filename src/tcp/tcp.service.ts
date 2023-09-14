import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpService {
  private server: net.Server;
  private readonly logger = new Logger(TcpService.name);

  startServer(port: number) {
    this.server = net.createServer((socket: net.Socket) => {
      this.logger.log('Client connected.');

      socket.on('data', (data: Buffer) => {
        const hexData = data.toString('hex');
        this.logger.log(`Message received: ${hexData}`);
        // Process the received message as needed
      });

      socket.on('end', () => {
        this.logger.log('Client disconnected.');
      });
    });

    this.server.listen(port, () => {
      this.logger.log(`TCP server is listening on port ${port}`);
    });
  }
}
