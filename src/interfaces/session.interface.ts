import { Document } from 'mongoose';

interface Session {
  id?: any;
  userId: any;
  sessionToken: string;
  expiresAt: Date;
}

interface SessionDocument extends Session, Document {
  id: string;
}

export { Session, SessionDocument };
