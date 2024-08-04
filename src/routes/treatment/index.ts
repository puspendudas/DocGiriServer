import { Router } from 'express';
import TreatmentsController from '@controllers/treatment/index';
import { CreateTreatmentDto } from '@dtos/treatments.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

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
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateTreatmentDto, 'body'), this.treatmentsController.createTreatment);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateTreatmentDto, 'body', true), this.treatmentsController.updateTreatment);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.treatmentsController.deleteTreatment);
  }
}

export default TreatmentsRoute;
