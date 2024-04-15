import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.shemas';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/schemas/UserSettings.shemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
