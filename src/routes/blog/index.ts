import { Router } from 'express';
import BlogsController from '@controllers/blog/index';
import { CreateBlogDto } from '@dtos/blog.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class BlogsRoute implements Routes {
  public path = '/api/v1/blogs';
  public router = Router();

  public blogsController: BlogsController;

  constructor() {
    this.blogsController = new BlogsController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.blogsController.getBlogs);
    this.router.get(`${this.path}/:id`, this.blogsController.getBlogById);
    this.router.post(`${this.path}`, validationMiddleware(CreateBlogDto, 'body'), this.blogsController.createBlog);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateBlogDto, 'body', true), this.blogsController.updateBlog);
    this.router.delete(`${this.path}/:id`, this.blogsController.deleteBlog);
  }
}

export default BlogsRoute;
