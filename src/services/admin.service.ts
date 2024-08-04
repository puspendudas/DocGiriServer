import { CreateAdminDto } from '@dtos/admin.dto';
import { HttpException } from '@exceptions/HttpException';
import AdminModel from '@models/admin.model';
import { Admin } from '@interfaces/admin.interface';
import { isEmpty } from '@utils/util';

class AdminService {
  public admins = AdminModel;

  public async findAllAdmins(): Promise<Admin[]> {
    const allAdmins: Admin[] = await this.admins.find();
    return allAdmins;
  }

  public async findAdminById(adminId: string): Promise<Admin> {
    if (isEmpty(adminId)) throw new HttpException(400, 'AdminId is empty');

    const findAdmin: Admin = await this.admins.findById(adminId);
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async createAdmin(adminData: CreateAdminDto): Promise<Admin> {
    if (isEmpty(adminData)) throw new HttpException(400, 'adminData is empty');

    const findAdmin: Admin = await this.admins.findOne({ email: adminData.email });
    if (findAdmin) throw new HttpException(409, `This email ${adminData.email} already exists`);

    const createAdminData: Admin = await this.admins.create(adminData);
    return createAdminData;
  }

  public async updateAdmin(adminId: string, adminData: CreateAdminDto): Promise<Admin> {
    if (isEmpty(adminData)) throw new HttpException(400, 'adminData is empty');

    const findAdmin: Admin = await this.admins.findById(adminId);
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    await this.admins.updateOne({ _id: adminId }, adminData);

    const updateAdmin: Admin = await this.admins.findById(adminId);
    return updateAdmin;
  }

  public async deleteAdmin(adminId: string): Promise<Admin> {
    if (isEmpty(adminId)) throw new HttpException(400, "Admin doesn't existId");

    const findAdmin: Admin = await this.admins.findById(adminId);
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    await this.admins.findByIdAndDelete(adminId);

    return findAdmin;
  }
}

export default AdminService;
