import { Document, ObjectId } from 'mongoose';

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
  _id: ObjectId;  // MongoDB ObjectId
}

export { Treatment, TreatmentDocument };
