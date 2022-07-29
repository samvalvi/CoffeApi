import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserDto } from './dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.showUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.showUser(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    const exist = await this.userService.showUserByEmail(user.email);
    if (exist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const result = await this.userService.addUser(user);

    if (!result) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    const exist = await this.userService.showUser(id);
    if (!exist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.userService.patchUser(id, user);

    if (!result) {
      throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const exist = await this.userService.showUser(id);
    if (!exist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.userService.changeUserStatus(id);

    if (!result) {
      throw new HttpException('User not deleted', HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
