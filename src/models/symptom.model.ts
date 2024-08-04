import { model, Schema } from 'mongoose';
import { SymptomDocument } from '@interfaces/symptoms.interface';

const symptomSchema = new Schema<SymptomDocument>({
    name: { type: String, required: true },
    description: { type: String },
    commonCauses: [{ type: String }],
    possibleTreatments: [{ type: Schema.Types.ObjectId, ref: 'Treatment' }],
}, { timestamps: true });

const SymptomModel = model<SymptomDocument>('Symptom', symptomSchema);

export default SymptomModel;
