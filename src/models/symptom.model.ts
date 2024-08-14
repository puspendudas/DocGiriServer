// symptom.model.ts
import { model, Schema } from 'mongoose';
import { SymptomDocument } from '@interfaces/symptoms.interface';

const symptomSchema = new Schema<SymptomDocument>({
    name: { type: String, required: true },
    description: { type: String },
    commonCauses: [{ type: String }],
    possibleTreatments: [{ type: Schema.Types.ObjectId, ref: 'Treatment' }],
    children: [{ type: Schema.Types.ObjectId, ref: 'Symptom' }],  // Reference to child symptoms
    parent: { type: Schema.Types.ObjectId, ref: 'Symptom', default: null }  // Reference to parent symptom (if any)
}, { timestamps: true });

const SymptomModel = model<SymptomDocument>('Symptom', symptomSchema);

export default SymptomModel;
