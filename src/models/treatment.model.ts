import { model, Schema } from 'mongoose';
import { TreatmentDocument } from '@interfaces/treatment.model';

const treatmentSchema = new Schema<TreatmentDocument>({
    name: { type: String, required: true },
    description: { type: String },
    steps: [{ type: String }],
    medications: [{ type: String }],
    precautions: [{ type: String }],
    associatedSymptoms: [{ type: Schema.Types.ObjectId, ref: 'Symptom' }],
}, { timestamps: true });

const TreatmentModel = model<TreatmentDocument>('Treatment', treatmentSchema);

export default TreatmentModel;
