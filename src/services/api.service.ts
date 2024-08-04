import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import UserModel from '@models/user.model';
import { User, UserRespond } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { logger } from '@/utils/logger';
import { Api, ApiRespond } from '@/interfaces/api.interface';
import ApiModel from '@/models/api.model';
import ApiKeyGenerator from '@/functions/genarateApi';

class ApiService {
  public api = ApiModel;
  public genarateApi = ApiKeyGenerator;

  public async findAllApi(): Promise<ApiRespond[]> {
    const allApi: ApiRespond[] = await this.api.find().select('-__v');
    return allApi;
  }

  public async findApi(user: User): Promise<ApiRespond[]> {
    if (isEmpty(user)) throw new HttpException(400, 'userData is empty');

    const countApi = await this.api.find({ user: user });
    return countApi;
  }

  public async createApi(apiData: User): Promise<ApiRespond> {
    if (isEmpty(apiData)) throw new HttpException(400, 'userData is empty');

    const countApi = await this.api.countDocuments({ user: apiData }).populate('User');

    console.log(countApi);

    if (countApi >= 5) throw new HttpException(429, 'Api creation Limit is exceeded');

    const api = {
      key: this.genarateApi.generateApiKey(),
      user: apiData,
    };

    const createApiData: Api = await this.api.create({ ...api });
    return createApiData;
  }
}

export default ApiService;
