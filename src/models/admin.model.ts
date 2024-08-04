import { model, Schema } from 'mongoose';
import { AdminDocument } from '@interfaces/admin.interface';

const adminSchema = new Schema<AdminDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    permissions: [{ type: String }],
}, { timestamps: true });

const AdminModel = model<AdminDocument>('Admin', adminSchema);

export default AdminModel;
