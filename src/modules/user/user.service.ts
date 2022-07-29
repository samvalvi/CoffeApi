import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { genSaltSync, hashSync } from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async showUsers(): Promise<User[]> {
    return await this.userRepository.findBy({ status: true });
  }

  async showUser(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id, status: true });
  }

  async showUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email, status: true });
  }

  async addUser(user: CreateUserDto): Promise<User> {
    const { password } = user;

    const salt = genSaltSync(13);
    user.password = hashSync(password, salt);

    const userDto: User = this.userRepository.create(user);
    return await this.userRepository.save(userDto);
  }

  async patchUser(id: string, user: UpdateUserDto): Promise<User> {
    const userDto: User = await this.userRepository.preload({ id, ...user });
    return this.userRepository.save(userDto);
  }

  async changeUserStatus(id: string): Promise<User> {
    const userDto: User = await this.userRepository.findOneBy({ id: id });
    userDto.status = false;
    return this.userRepository.save(userDto);
  }
}
