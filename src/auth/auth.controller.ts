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
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
import { BadRequestDto } from 'src/common/bad-request.dto';
import { NotFoundDto } from 'src/common/not-found.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ForbiddenDto } from 'src/common/forbidden.dto';
import { UnauthorizedDto } from 'src/common/unauthorized.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiCreatedResponse({
    description: 'User was successfully signed up',
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials has been provided',
    type: BadRequestDto,
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
