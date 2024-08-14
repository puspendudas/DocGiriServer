import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import ApiController from '@/controllers/api';

class ApiRoute implements Routes {
  public path = '/api/v1/api';
  public router = Router();

  public apiController: ApiController;

  constructor() {
    this.apiController = new ApiController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/find/all`, this.apiController.findAllApi);
    this.router.get(`${this.path}/find`,  this.apiController.findApi);
    this.router.post(`${this.path}/create`,  this.apiController.createApi);
  }
}

export default ApiRoute;
