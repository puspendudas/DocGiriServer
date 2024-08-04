import { model, Schema } from 'mongoose';
import { SessionDocument } from '@interfaces/session.interface';

const sessionSchema = new Schema<SessionDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });

const SessionModel = model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
