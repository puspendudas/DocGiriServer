import { NextFunction, Request, Response } from 'express';
import { CreateTreatmentDto } from '@dtos/treatments.dto';
import { Treatment } from '@interfaces/treatment.model';
import TreatmentService from '@services/treatment.service';

class TreatmentsController {
  public treatmentService: TreatmentService;

  constructor() {
    this.treatmentService = new TreatmentService();
  }

  public getTreatments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTreatmentsData: Treatment[] = await this.treatmentService.findAllTreatments();
      res.status(200).json({ data: findAllTreatmentsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getTreatmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatmentId = String(req.params.id);
      const findOneTreatmentData: Treatment = await this.treatmentService.findTreatmentById(treatmentId);
      res.status(200).json({ data: findOneTreatmentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createTreatment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatmentData: CreateTreatmentDto = req.body;
      const createTreatmentData: Treatment = await this.treatmentService.createTreatment(treatmentData);
      res.status(201).json({ data: createTreatmentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateTreatment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatmentId = String(req.params.id);
      const treatmentData: CreateTreatmentDto = req.body;
      const updateTreatmentData: Treatment = await this.treatmentService.updateTreatment(treatmentId, treatmentData);
      res.status(200).json({ data: updateTreatmentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTreatment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const treatmentId = String(req.params.id);
      const deleteTreatmentData: Treatment = await this.treatmentService.deleteTreatment(treatmentId);
      res.status(200).json({ data: deleteTreatmentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TreatmentsController;
