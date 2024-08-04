import { NextFunction, Request, Response } from 'express';
import { CreateSessionDto } from '@dtos/session.dto';
import { Session } from '@interfaces/session.interface';
import SessionService from '@services/session.service';

class SessionsController {
  public sessionService: SessionService;

  constructor() {
    this.sessionService = new SessionService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionData: CreateSessionDto = req.body;
      const createSessionData: Session = await this.sessionService.createSession(sessionData);

      res.status(201).json({ data: createSessionData, message: 'logged in' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = String(req.body.sessionId);
      const deleteSessionData: Session = await this.sessionService.deleteSession(sessionId);

      res.status(200).json({ data: deleteSessionData, message: 'logged out' });
    } catch (error) {
      next(error);
    }
  };

  public getSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionId = String(req.params.id);
      const findSessionData: Session = await this.sessionService.findSessionById(sessionId);

      res.status(200).json({ data: findSessionData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default SessionsController;
