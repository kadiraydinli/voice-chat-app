/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { OpenVidu } from 'openvidu-node-client';
import { AppService } from './app.service';
@Controller()
export class AppController {
  private readonly OV: OpenVidu;
  constructor(private readonly appService: AppService) {
    this.OV = new OpenVidu('http://192.168.1.69:4443', 'MY_SECRET');
  }

  @Get()
  getHello(): string {
    return 'Voice Chat App';
  }

  @Get('rooms')
  getRooms(@Res() res) {
    const rooms = this.OV.activeSessions.map((i) => i.sessionId);
    res.send(rooms);
  }

  @Post('sessions')
  async sessions(@Req() req, @Res() res) {
    const session = await this.OV.createSession(req.body);
    res.send(session.sessionId);
  }

  @Post('sessions/:sessionId/connections')
  async sessionsConnections(@Req() req, @Res() res, @Param() params) {
    const session = this.OV.activeSessions.find((s) => s.sessionId === params.sessionId);
    if (!session) {
      res.status(404).send();
    } else {
      session.activeConnections;
      const connection = await session.createConnection(req.body);
      res.send(connection.token);
    }
  }
}
