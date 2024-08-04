import { NextFunction, Request, Response } from 'express';
import { CreateCampingDto } from '@dtos/camping.dto';
import { Camping } from '@interfaces/camping.interface';
import { logger } from '@utils/logger';
import CampingService from '@services/camping.service';
import ConvertResponds from '@functions/converResponts';
import { User } from '@/interfaces/users.interface';
import ApiService from '@/services/api.service';
import { Api } from '@/interfaces/api.interface';

class ApiController {
  public apiService: ApiService;
  public convertResponds: ConvertResponds;

  constructor() {
    this.apiService = new ApiService();
    this.convertResponds = new ConvertResponds();
  }

  public findAllApi = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body.user;

      const findApiData: Api[] = await this.apiService.findAllApi();

      res.status(200).json({ data: findApiData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public findApi = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body.user;

      const findApiData: Api[] = await this.apiService.findApi(user);

      res.status(200).json({ data: findApiData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createApi = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: User = req.body.user;

      const createApiData: Api = await this.apiService.createApi(user);

      res.status(201).json({ data: { createApiData }, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApiController;
