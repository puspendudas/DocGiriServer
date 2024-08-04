import { Document } from 'mongoose';

interface Treatment {
  id?: any;
  name: string;
  description?: string;
  steps?: string[];
  medications?: string[];
  precautions?: string[];
  associatedSymptoms?: any[];
}

interface TreatmentDocument extends Treatment, Document {
  id: string;
}

export { Treatment, TreatmentDocument };
