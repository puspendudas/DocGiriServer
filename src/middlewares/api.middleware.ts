import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import User from '@models/user.model';
import { HttpException } from '@exceptions/HttpException';
import { Socket } from 'socket.io';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const apiMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const validApiKeys = ['your_api_key_1', 'your_api_key_2'];

    const apiKey = socket.handshake.headers['x-api-key'] ? socket.handshake.headers['x-api-key'] : null;

    if (!apiKey || !validApiKeys.includes(apiKey as string)) {
        return next(new Error('Unauthorized'));
    }

    next();

    // if (Authorization) {
    //   const secretKey: string = SECRET_KEY;
    //   const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
    //   const userId = verificationResponse.id;
    //   const findUser = await User.findById(userId);

    //   if (findUser) {
    //     req.user = findUser;
    //     next();
    //   } else {
    //     next(new HttpException(401, 'Wrong authentication token'));
    //   }
    // } else {
    //   next(new HttpException(404, 'Authentication token missing'));
    // }

};

export default apiMiddleware;
