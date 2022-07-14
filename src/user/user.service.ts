import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  getAll() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(userDto: CreateUserDto) {
    this.users.push({
      ...userDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: 0,
    });

    return this.users[this.users.length - 1];
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
      version: this.users[userIndex].version + 1,
      updatedAt: Date.now(),
    };

    return this.users[userIndex];
  }

  remove(id: string) {
    console.log(id);
    const initialLength = this.users.length;

    this.users = this.users.filter((user) => user.id !== id);

    return initialLength > this.users.length ? { deleted: 1 } : { deleted: 0 };
  }
}
