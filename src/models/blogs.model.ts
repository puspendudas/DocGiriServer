import { model, Schema } from 'mongoose';
import { BlogDocument } from '@interfaces/blog.interface';

const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const blogSchema = new Schema<BlogDocument>({
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    comments: [commentSchema],
}, { timestamps: true });

const BlogModel = model<BlogDocument>('Blog', blogSchema);

export default BlogModel;
