import { Document } from 'mongoose';
import { Response } from 'express';
import { User } from './users.interface';

interface Api {
  id?: any;
  key: string;
  user: User;
}

// Extend the User interface with Document to include Mongoose-specific functionality
interface ApiDocument extends Api, Document {
  id: string;
}

interface ApiRespond {
  key: string;
  user: User;
}

export { Api, ApiDocument, ApiRespond };
