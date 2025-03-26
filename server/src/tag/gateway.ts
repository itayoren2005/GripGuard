import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Position } from './dto/position.dto';
import { Alerts } from './dto/alerts.dto';

@WebSocketGateway()
export class TagGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendPosition(position: Position) {
    this.server.emit('update-position', position);
  }

  sendAlerts(alerts: Alerts) {
    this.server.emit('update-alerts', alerts);
  }
}
