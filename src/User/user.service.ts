import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.shemas';
import { createUserDTO } from './dto/createUser.dto';
import { updateUserDTO } from './dto/updateUserDTO';
import { UserSettings } from 'src/schemas/UserSettings.shemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: createUserDTO) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  async updateUser(id: string, user: updateUserDTO) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  //   getUser() {
  //     return this.UserRepository.find({});
  //   }

  //   createUser(UserObj: createUserType) {
  //     const newUser = this.UserRepository.create(UserObj);
  //     return this.UserRepository.save(newUser);
  //   }

  //   getUserById(id: number) {
  //     return this.UserRepository.findOneBy({ id });
  //   }
}
