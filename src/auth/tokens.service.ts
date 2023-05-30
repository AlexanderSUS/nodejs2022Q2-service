import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  getTokens(payload: { login: string; userId: string }) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    return { accessToken, refreshToken };
  }
}
