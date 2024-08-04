import { NextFunction, Request, Response } from 'express';
import { CreateSymptomDto } from '@dtos/symptoms.dto';
import { Symptom } from '@interfaces/symptoms.interface';
import SymptomService from '@services/symptom.service';

class SymptomsController {
  public symptomService: SymptomService;

  constructor() {
    this.symptomService = new SymptomService();
  }

  public getSymptoms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSymptomsData: Symptom[] = await this.symptomService.findAllSymptoms();
      res.status(200).json({ data: findAllSymptomsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getSymptomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symptomId = String(req.params.id);
      const findOneSymptomData: Symptom = await this.symptomService.findSymptomById(symptomId);
      res.status(200).json({ data: findOneSymptomData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createSymptom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symptomData: CreateSymptomDto = req.body;
      const createSymptomData: Symptom = await this.symptomService.createSymptom(symptomData);
      res.status(201).json({ data: createSymptomData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateSymptom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symptomId = String(req.params.id);
      const symptomData: CreateSymptomDto = req.body;
      const updateSymptomData: Symptom = await this.symptomService.updateSymptom(symptomId, symptomData);
      res.status(200).json({ data: updateSymptomData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSymptom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const symptomId = String(req.params.id);
      const deleteSymptomData: Symptom = await this.symptomService.deleteSymptom(symptomId);
      res.status(200).json({ data: deleteSymptomData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SymptomsController;
