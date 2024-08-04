import SocketApp from '@/SocketApp';
import IndexRoute from '@/routes/index.routes';
import UsersRoute from '@/routes/user/index';
import SessionsRoute from '@/routes/sessions/index';
import AdminRoute from '@/routes/admin/index';
import SymptomsRoute from '@/routes/symptom/index';
import TreatmentsRoute from '@/routes/treatment/index';
import BlogsRoute from '@/routes/blog/index';
import validateEnv from '@utils/validateEnv';
import SocketRoute from '@routes/socket/index';
import ApiRoute from '@routes/api/index';

validateEnv();

const httpRoutes = [
  new IndexRoute(),
  new UsersRoute(),
  new SessionsRoute(),
  new AdminRoute(),
  new SymptomsRoute(),
  new TreatmentsRoute(),
  new BlogsRoute(),
  new ApiRoute()
];

const socketRoutes = [new SocketRoute()];

const app = new SocketApp([...httpRoutes, ...socketRoutes]);

app.start();
