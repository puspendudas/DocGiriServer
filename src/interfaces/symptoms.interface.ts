import { Document } from 'mongoose';

interface Symptom {
  id?: any;
  name: string;
  description?: string;
  commonCauses?: string[];
  possibleTreatments?: any[];
}

interface SymptomDocument extends Symptom, Document {
  id: string;
}

export { Symptom, SymptomDocument };
