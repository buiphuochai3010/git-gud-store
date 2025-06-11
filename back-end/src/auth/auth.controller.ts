import type { Request as RequestType } from 'express';
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local.auth-guard';
import { Public } from '@/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@Request() req: RequestType) {
    return this.authService.login(req.user);
  }
  
  @Get('profile')
  getProfile(@Request() req: RequestType) {
    console.log("Triggered!!!!")
    return req.user;
  }
}
