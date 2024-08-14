import { Document, ObjectId } from 'mongoose';

interface Symptom {
  id?: any;
  name: string;
  description?: string;
  commonCauses?: string[];
  possibleTreatments?: any[];
  children?: Symptom[];  // Children symptoms
  parent?: Symptom | null;  // Parent symptom
}

interface SymptomDocument extends Symptom, Document {
  _id: ObjectId;  // MongoDB ObjectId
}

export { Symptom, SymptomDocument };
