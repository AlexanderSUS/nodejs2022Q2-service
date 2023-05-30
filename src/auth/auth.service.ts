import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { TokensService } from './tokens.service';
import { HashService } from './hash.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private tokensService: TokensService,
    private hashService: HashService,
  ) {}

  async validateUser(login: string, pass: string): Promise<IUser | null> {
    const user = await this.userService.findOneByLogin(login);
    const isPasswordMatch = await this.hashService.compare(pass, user.password);

    if (user && isPasswordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signUp({ login, password }: CreateUserDto) {
    const hashedPassword = await this.hashService.hash(password);

    await this.userService.create({ login, password: hashedPassword });

    return { message: 'User was successfully created' };
  }

  async login({ login, id: userId }: IUser) {
    const tokens = this.tokensService.getTokens({ login, userId });
    const refreshTokenHash = await this.hashService.hash(tokens.refreshToken);
    await this.userService.updateRefreshToken(userId, refreshTokenHash);

    return tokens;
  }

  async refresh({ id, login }: UserEntity) {
    const tokens = this.tokensService.getTokens({ login, userId: id });

    const newRefreshTokenHash = await this.hashService.hash(
      tokens.refreshToken,
    );

    await this.userService.updateRefreshToken(id, newRefreshTokenHash);

    return tokens;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.userService.findOne(userId);

    const isRefreshTokenMatching = await this.hashService.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
