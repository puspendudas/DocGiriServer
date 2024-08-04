import { Router } from 'express';
import AdminController from '@controllers/admin/index';
import { CreateAdminDto } from '@dtos/admin.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class AdminRoute implements Routes {
  public path = '/api/v1/admins';
  public router = Router();

  public adminController: AdminController;

  constructor() {
    this.adminController = new AdminController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.adminController.getAdmins);
    this.router.get(`${this.path}/:id`, authMiddleware, this.adminController.getAdminById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateAdminDto, 'body'), this.adminController.createAdmin);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateAdminDto, 'body', true), this.adminController.updateAdmin);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.adminController.deleteAdmin);
  }
}

export default AdminRoute;
