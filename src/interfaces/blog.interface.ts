import { Document } from 'mongoose';

interface Comment {
  userId: any;
  comment: string;
  createdAt: Date;
}

interface Blog {
  id?: any;
  authorId: any;
  title: string;
  content: string;
  tags?: string[];
  comments?: Comment[];
}

interface BlogDocument extends Blog, Document {
  id: string;
}

export { Blog, BlogDocument, Comment };
