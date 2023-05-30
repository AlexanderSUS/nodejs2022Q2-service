import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtModuleOptions } from 'src/config/jwtModuleOptions';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: jwtModuleOptions.secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    return this.authService.getUserIfRefreshTokenMatches(
      req.body.refreshToken,
      payload.id,
    );
  }
}
