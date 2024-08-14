import { Document } from 'mongoose';

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
  id: string;
}

export { Symptom, SymptomDocument };
