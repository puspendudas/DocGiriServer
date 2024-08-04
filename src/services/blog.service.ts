import { CreateBlogDto } from '@dtos/blog.dto';
import { HttpException } from '@exceptions/HttpException';
import BlogModel from '@models/blogs.model';
import { Blog } from '@interfaces/blog.interface';
import { isEmpty } from '@utils/util';

class BlogService {
  public blogs = BlogModel;

  public async findAllBlogs(): Promise<Blog[]> {
    const allBlogs: Blog[] = await this.blogs.find();
    return allBlogs;
  }

  public async findBlogById(blogId: string): Promise<Blog> {
    if (isEmpty(blogId)) throw new HttpException(400, 'BlogId is empty');

    const findBlog: Blog = await this.blogs.findById(blogId);
    if (!findBlog) throw new HttpException(409, "Blog doesn't exist");

    return findBlog;
  }

  public async createBlog(blogData: CreateBlogDto): Promise<Blog> {
    if (isEmpty(blogData)) throw new HttpException(400, 'blogData is empty');

    const createBlogData: Blog = await this.blogs.create(blogData);
    return createBlogData;
  }

  public async updateBlog(blogId: string, blogData: CreateBlogDto): Promise<Blog> {
    if (isEmpty(blogData)) throw new HttpException(400, 'blogData is empty');

    const findBlog: Blog = await this.blogs.findById(blogId);
    if (!findBlog) throw new HttpException(409, "Blog doesn't exist");

    await this.blogs.updateOne({ _id: blogId }, blogData);

    const updateBlog: Blog = await this.blogs.findById(blogId);
    return updateBlog;
  }

  public async deleteBlog(blogId: string): Promise<Blog> {
    if (isEmpty(blogId)) throw new HttpException(400, "Blog doesn't existId");

    const findBlog: Blog = await this.blogs.findById(blogId);
    if (!findBlog) throw new HttpException(409, "Blog doesn't exist");

    await this.blogs.findByIdAndDelete(blogId);

    return findBlog;
  }
}

export default BlogService;
