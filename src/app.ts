import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, CREDENTIALS, ORIGIN_LIVE, ORIGIN_SATTA, ORIGIN_LOCAL, ORIGIN_LOCAL_1, ORIGIN_LOCAL_2, ORIGIN_SATTA_1, ORIGIN_LIVE_1 } from '@config';
import DB from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`===================================`);
      logger.info(`======== ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port} 🚀`);
      logger.info(`===================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB()
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: [ORIGIN_LOCAL, ORIGIN_LIVE, ORIGIN_SATTA,  ORIGIN_LOCAL_1, ORIGIN_LOCAL_2, ORIGIN_SATTA_1, ORIGIN_LIVE_1], optionsSuccessStatus: 200, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
