import { model, Schema } from 'mongoose';
import { UserDocument } from '@interfaces/users.interface';

const userSchema = new Schema<UserDocument>({
    googleId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    medicalHistory: [{
        symptomId: { type: Schema.Types.ObjectId, ref: 'Symptom' },
        diagnosisDate: { type: Date },
        treatmentId: { type: Schema.Types.ObjectId, ref: 'Treatment' },
    }],
}, { timestamps: true });

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
