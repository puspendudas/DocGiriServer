import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import UserModel from '@models/user.model';
import { User, UserResponse } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class UserService {
  public users = UserModel;

  public async findAllUsers(): Promise<UserResponse[]> {
    const allUsers: UserResponse[] = await this.users.find().select('-_id -createdAt -updatedAt -__v');
    return allUsers;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findById(userId).select('-_id -createdAt -updatedAt -__v');
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async findUserByEmail(userEmail: string): Promise<User> {
    if (isEmpty(userEmail)) throw new HttpException(400, 'email is empty');

    const findUser: User = await this.users.findOne({ email: userEmail }).select('-_id -createdAt -updatedAt -__v');
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const createUserData: User = await this.users.create({ ...userData });
    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.updateOne({ _id: userId }, userData);

    const updateUser: User = await this.users.findById(userId);
    return updateUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.findByIdAndDelete(userId);

    return findUser;
  }
}

export default UserService;
