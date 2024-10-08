// symptoms.routes.ts

import { Router } from 'express';
import SymptomsController from '@controllers/symptom/index';
import { CreateSymptomDto } from '@dtos/symptoms.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class SymptomsRoute implements Routes {
  public path = '/api/v1/symptoms';
  public router = Router();

  public symptomsController: SymptomsController;

  constructor() {
    this.symptomsController = new SymptomsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.symptomsController.getSymptoms);
    this.router.get(`${this.path}/:id`, this.symptomsController.getSymptomById);
    this.router.get(`${this.path}/:id/next`, this.symptomsController.getChildrenOrTreatment);
    this.router.post(`${this.path}`, validationMiddleware(CreateSymptomDto, 'body'), this.symptomsController.createSymptom);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateSymptomDto, 'body', true), this.symptomsController.updateSymptom);
    this.router.delete(`${this.path}/:id`, this.symptomsController.deleteSymptom);
  }
}

export default SymptomsRoute;
