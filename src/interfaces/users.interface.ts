import { Document } from 'mongoose';

interface User {
  id?: any;
  googleId: string;
  name: string;
  email: string;
  profilePicture?: string;
  dateOfBirth?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  medicalHistory?: Array<{
    symptomId: any;
    diagnosisDate: Date;
    treatmentId: any;
  }>;
}

interface UserDocument extends User, Document {
  id: string;
}

interface UserResponse {
  name: string;
  email: string;
  googleId: string;
  profilePicture?: string;
  dateOfBirth?: Date;
  gender?: 'Male' | 'Female' | 'Other';
}

export { User, UserDocument, UserResponse };
