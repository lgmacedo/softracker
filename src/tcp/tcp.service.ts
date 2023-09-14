import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpService {
  private server: net.Server;
  private readonly logger = new Logger(TcpService.name);

  private PING_TYPE = 1;
  private LOCATION_TYPE = 2;

  startServer(port: number) {
    this.server = net.createServer((socket: net.Socket) => {
      this.logger.log('Client connected.');

      socket.on('data', (data: Buffer) => {
        const hexData = data.toString('hex');
        this.logger.log(`Message received: ${hexData}`);

        // Parse the incoming message
        const parsedMessage = this.parseMessage(hexData);

        // Check if it's a Ping request
        if (parsedMessage && parsedMessage.messageType === this.PING_TYPE) {
          // Respond with a Ping ACK
          this.sendPingAck(socket, parsedMessage.data);
        }
      });

      socket.on('end', () => {
        this.logger.log('Client disconnected.');
      });
    });

    this.server.listen(port, () => {
      this.logger.log(`TCP server is listening on port ${port}`);
    });
  }

  private parseMessage(hexData: string) {
    // Check if the received message has the correct length
    if (hexData.length !== 24 && hexData.length !== 64) {
      this.logger.error('Invalid message length.');
      return null;
    }

    // Extract header, device ID, message type, data, and footer
    const header = hexData.slice(0, 4);
    const deviceId = hexData.slice(4, 10);
    const messageType = hexData.slice(10, 12);
    const data = hexData.slice(12, hexData.length - 4);
    const footer = hexData.slice(-4);

    // Check if the header and footer are correct
    if (header.toUpperCase() !== '50F7' || footer.toUpperCase() !== '73C4') {
      this.logger.error('Invalid header or footer.');
      return null;
    }

    // Convert device ID and message type to decimal
    const decimalDeviceId = parseInt(deviceId, 16);
    const decimalMessageType = parseInt(messageType, 16);

    // Create and return a parsed message object
    const parsedMessage = {
      header,
      deviceId: decimalDeviceId,
      messageType: decimalMessageType,
      data,
      footer,
    };

    console.log(parsedMessage);

    return parsedMessage;
  }

  private sendPingAck(socket: net.Socket, data: string) {
    // Create and send a Ping ACK response
    const pingAckMessage = `50F701${data}73C4`; // Replace <ID> and <MessageType> as needed

    socket.write(Buffer.from(pingAckMessage, 'hex'));
  }
}
