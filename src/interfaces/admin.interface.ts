import { Document } from 'mongoose';

interface Admin {
  id?: any;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

interface AdminDocument extends Admin, Document {
  id: string;
}

export { Admin, AdminDocument };
