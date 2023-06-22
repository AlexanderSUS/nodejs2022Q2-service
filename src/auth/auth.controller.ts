import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public.decorator';
import { RefreshAuthGuard } from './refresh-auth.guard';
import { RequestWithUser } from './interface/request-with-user.interface';
import { NotFoundDto } from 'src/common/dto/not-found.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ForbiddenDto } from 'src/common/dto/forbidden.dto';
import { UnauthorizedDto } from 'src/common/dto/unauthorized.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpApiResponse } from 'src/common/decorators/sign-up-api-response.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @SignUpApiResponse({
    successResponseType: SignUpResponseDto,
    successDescription: 'User was successfully signed up',
    badRequestDescription: 'Reason',
  })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'User was successfully logged in',
    type: LoginResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid credentials has been provided',
    type: NotFoundDto,
  })
  @ApiForbiddenResponse({
    description: "user with such login, password doesn't exist",
    type: ForbiddenDto,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Request() { user }: RequestWithUser) {
    return this.authService.login(user);
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @ApiOkResponse({
    description: 'Token was successfully refreshed',
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or expired',
    type: UnauthorizedDto,
  })
  @HttpCode(HttpStatus.OK)
  refresh(@Request() { user }: RequestWithUser) {
    return this.authService.refresh(user);
  }
}
