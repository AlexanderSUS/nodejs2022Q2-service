import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './locall.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from 'src/config/jwtModuleOptions';
import { JwtStrategy } from './jwt.strategy';

console.log(jwtModuleOptions);

@Module({
  imports: [UserModule, PassportModule, JwtModule.register(jwtModuleOptions)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
