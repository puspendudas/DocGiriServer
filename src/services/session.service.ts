import { CreateSessionDto } from '@dtos/session.dto';
import { HttpException } from '@exceptions/HttpException';
import SessionModel from '@models/session.model';
import { Session } from '@interfaces/session.interface';
import { isEmpty } from '@utils/util';

class SessionService {
  public sessions = SessionModel;

  public async createSession(sessionData: CreateSessionDto): Promise<Session> {
    if (isEmpty(sessionData)) throw new HttpException(400, 'sessionData is empty');

    const createSessionData: Session = await this.sessions.create(sessionData);
    return createSessionData;
  }

  public async deleteSession(sessionId: string): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, "Session doesn't existId");

    const findSession: Session = await this.sessions.findById(sessionId);
    if (!findSession) throw new HttpException(409, "Session doesn't exist");

    await this.sessions.findByIdAndDelete(sessionId);

    return findSession;
  }

  public async findSessionById(sessionId: string): Promise<Session> {
    if (isEmpty(sessionId)) throw new HttpException(400, 'SessionId is empty');

    const findSession: Session = await this.sessions.findById(sessionId);
    if (!findSession) throw new HttpException(409, "Session doesn't exist");

    return findSession;
  }
}

export default SessionService;
