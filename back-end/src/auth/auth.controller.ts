import type { Request as RequestType } from 'express';
import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local.auth-guard';
import { Public } from '@/common/decorators/public.decorator';
import { CreateAccountDto } from '@/modules/accounts/dto/create-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@Request() req: RequestType) {
    return this.authService.login(req.user);
  }
  
  @Post('register')
  @Public()
  register(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.register(createAccountDto);
  }

  @Post('logout')
  logout(@Request() req: RequestType & { user: { id: number } }) {
    return this.authService.logout(req?.user?.id);
  }

  @Get('current-user')
  getCurrentUser(@Request() req: RequestType & { user: { id: number } }) {
    console.log('[getCurrentUser] req.user', req?.user);
    return this.authService.getCurrentUser(req?.user?.id);
  }
}
