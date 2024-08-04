import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import UserService from '@services/user.service';

class UsersController {
  public userServices: UserService;

  constructor() {
    this.userServices = new UserService();
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userServices.findAllUsers();
      res.status(200).json({ data: findAllUsersData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = String(req.params.id);
      const findOneUserData: User = await this.userServices.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userServices.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = String(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userServices.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = String(req.params.id);
      const deleteUserData: User = await this.userServices.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
