import { NextFunction, Request, Response } from 'express';
import { CreateAdminDto } from '@dtos/admin.dto';
import { Admin } from '@interfaces/admin.interface';
import AdminService from '@services/admin.service';

class AdminController {
  public adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAdminsData: Admin[] = await this.adminService.findAllAdmins();
      res.status(200).json({ data: findAllAdminsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = String(req.params.id);
      const findOneAdminData: Admin = await this.adminService.findAdminById(adminId);
      res.status(200).json({ data: findOneAdminData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: CreateAdminDto = req.body;
      const createAdminData: Admin = await this.adminService.createAdmin(adminData);
      res.status(201).json({ data: createAdminData, message: 'admin created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = String(req.params.id);
      const adminData: CreateAdminDto = req.body;
      const updateAdminData: Admin = await this.adminService.updateAdmin(adminId, adminData);
      res.status(200).json({ data: updateAdminData, message: 'admin updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = String(req.params.id);
      const deleteAdminData: Admin = await this.adminService.deleteAdmin(adminId);
      res.status(200).json({ data: deleteAdminData, message: 'admin deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;
