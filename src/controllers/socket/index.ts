import { NextFunction, Request, Response } from 'express';

class SocketController {
  public index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({'message': 'Welcome to the MatkaMarketData Socket!'});
    } catch (error) {
      next(error);
    }
  };
}

export default SocketController;
