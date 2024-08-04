import mongoose, { model, Schema } from 'mongoose';
import { UserDocument } from '@interfaces/users.interface';
import { ApiDocument } from '@/interfaces/api.interface';

const apiSchema = new Schema<ApiDocument>({
    key: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, { timestamps: true });


const ApiModel = model<ApiDocument>('Api', apiSchema);

export default ApiModel

