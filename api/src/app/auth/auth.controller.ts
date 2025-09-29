import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {LoginAuthDto} from "./dto/login-auth.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  async login(@Body() loginDto: LoginAuthDto) {
    const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
    );
    return this.authService.login(user);
  }
}
