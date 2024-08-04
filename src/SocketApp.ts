import http from 'http';
import { Server, Socket } from 'socket.io';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import DB from '@databases';
import { Routes, SocketRoutes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import App from '@/app';
import apiMiddleware from './middlewares/api.middleware';

class SocketApp extends App {
  private httpServer: http.Server;
  private io: Server;

  constructor(routes: SocketRoutes[]) {
    super(routes);
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer);

    this.initializeSocketRoutes(routes);
  }

  private initializeSocketRoutes(routes: SocketRoutes[]): void {
    // console.log(routes)
    routes.forEach((route) => {
      const { path, handler } = route;
      const namespace = path ? this.io.of(path) : this.io;

      namespace.on('connection', (socket: Socket) => {
        console.log('socket is ready for connection');
        // console.log(socket)
        handler(socket);
      });
    });
  }

  public start() {
    this.httpServer.listen(this.port, () => {
      logger.info(`===================================`);
      logger.info(`======== ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port} 🚀`);
      logger.info(`===================================`);
    });
  }

  public getSocketServer(): Server {
    return this.io;
  }
}

export default SocketApp;
