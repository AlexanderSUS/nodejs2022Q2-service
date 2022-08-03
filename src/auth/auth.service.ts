import { Injectable } from '@nestjs/common';
import { RefreshDto } from './dto/refresh.dto.';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bycrypt from 'bcrypt';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<IUser | null> {
    const user = await this.userService.findOneByLogin(login);

    const isPasswordMatch = await bycrypt.compare(pass, user.password);

    if (user && isPasswordMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signUp(createUserDto: CreateUserDto) {
    const password = await bycrypt.hash(
      createUserDto.password,
      parseInt(process.env.CRYPT_SALT),
    );

    await this.userService.create({ ...createUserDto, password });

    return { msg: 'User was successfully created' };
  }

  async login(user: IUser) {
    const payload = { login: user.login, userId: user.id };

    const secret = process.env.JWT_SECRET_KEY;

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
        secret,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret,
      }),
    };
  }

  // async refresh(refreshDto: RefreshDto) {
  //   return;
  // }
}
