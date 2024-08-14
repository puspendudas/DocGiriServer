import { Router } from 'express';
import TreatmentsController from '@controllers/treatment/index';
import { CreateTreatmentDto } from '@dtos/treatments.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TreatmentsRoute implements Routes {
  public path = '/api/v1/treatments';
  public router = Router();

  public treatmentsController: TreatmentsController;

  constructor() {
    this.treatmentsController = new TreatmentsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.treatmentsController.getTreatments);
    this.router.get(`${this.path}/:id`, this.treatmentsController.getTreatmentById);
    this.router.post(`${this.path}`,  validationMiddleware(CreateTreatmentDto, 'body'), this.treatmentsController.createTreatment);
    this.router.put(`${this.path}/:id`,  validationMiddleware(CreateTreatmentDto, 'body', true), this.treatmentsController.updateTreatment);
    this.router.delete(`${this.path}/:id`,  this.treatmentsController.deleteTreatment);
  }
}

export default TreatmentsRoute;
