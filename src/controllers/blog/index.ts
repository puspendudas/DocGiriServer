import { NextFunction, Request, Response } from 'express';
import { CreateBlogDto } from '@dtos/blog.dto';
import { Blog } from '@interfaces/blog.interface';
import BlogService from '@services/blog.service';

class BlogsController {
  public blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  public getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBlogsData: Blog[] = await this.blogService.findAllBlogs();
      res.status(200).json({ data: findAllBlogsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getBlogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = String(req.params.id);
      const findOneBlogData: Blog = await this.blogService.findBlogById(blogId);
      res.status(200).json({ data: findOneBlogData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogData: CreateBlogDto = req.body;
      const createBlogData: Blog = await this.blogService.createBlog(blogData);
      res.status(201).json({ data: createBlogData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = String(req.params.id);
      const blogData: CreateBlogDto = req.body;
      const updateBlogData: Blog = await this.blogService.updateBlog(blogId, blogData);
      res.status(200).json({ data: updateBlogData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = String(req.params.id);
      const deleteBlogData: Blog = await this.blogService.deleteBlog(blogId);
      res.status(200).json({ data: deleteBlogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BlogsController;
