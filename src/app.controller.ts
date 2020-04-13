import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
