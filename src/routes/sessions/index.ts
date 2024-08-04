import { Router } from 'express';
import SessionsController from '@controllers/session/index';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class SessionsRoute implements Routes {
  public path = '/api/v1/sessions';
  public router = Router();

  public sessionsController: SessionsController;

  constructor() {
    this.sessionsController = new SessionsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.sessionsController.login);
    this.router.post(`${this.path}/logout`, authMiddleware, this.sessionsController.logout);
    this.router.get(`${this.path}/:id`, authMiddleware, this.sessionsController.getSession);
  }
}

export default SessionsRoute;
