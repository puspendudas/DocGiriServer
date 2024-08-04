import { Router } from 'express';
import { Socket } from 'socket.io';

export interface Routes {
  path?: string;
  router: Router;
}


export interface SocketRoutes extends Routes {
  handler?: (socket: Socket) => void;
}