import { Router } from 'express';
import { Routes, SocketRoutes } from '@interfaces/routes.interface';
import { Socket } from 'socket.io';
import apiMiddleware from '@/middlewares/api.middleware';
import SocketController from '@/controllers/socket';

class SocketRoute implements SocketRoutes {
  public path = '/market';
  public router = Router();
  public socketController = new SocketController();

  // Method to handle socket events
  public game = false
  
  public handler = (socket: Socket) => {


    if (socket.handshake.headers['x-api-key']) {
      if (this.game) {
        socket.emit('hello', { data: 'Continue Game' });
      }else{
        socket.emit('hello', { data: 'Wellcome Game' });
      }
      
      socket.on('start', data => {
        this.game = true
        console.log(data)
        setTimeout(() => {
          socket.emit('send-hello', { data: 'Puspendu' });
        }, 180000);
        setTimeout(() => {
          socket.emit('hello', { data: 'Wellcome Game' });
        }, 180000);
      });

      socket.on('bet', data => {
        console.log(data)
        socket.emit('bet-hello', { data: 'Mouli' });
      })
      
    } else {
      socket.disconnect();
    }

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected from camping route');
    });
  };
}

export default SocketRoute;
