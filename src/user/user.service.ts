import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  async create(userDto: CreateUserDto) {
    this.users.push({
      ...userDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: 0,
    });

    const newUser = { ...this.users[this.users.length - 1] };

    delete newUser.password;

    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updatePasswordDto.oldPassword !== this.users[userIndex].password) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      password: updatePasswordDto.newPassword,
      version: this.users[userIndex].version + 1,
      updatedAt: Date.now(),
    };

    const updatedUser = { ...this.users[userIndex] };
    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: string) {
    const initialLength = this.users.length;

    this.users = this.users.filter((user) => user.id !== id);

    if (!(initialLength > this.users.length)) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
