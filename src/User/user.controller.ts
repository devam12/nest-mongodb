import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { updateUserDTO } from './dto/updateUserDTO';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDTO: createUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: updateUserDTO,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const user = await this.userService.updateUser(id, updateUserDTO);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const user = this.userService.deleteUser(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }
}
