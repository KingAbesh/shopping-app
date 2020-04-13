import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('welcome')
  getWelcome(@Res() res: Response) {
    this.userService.getWelcome(res);
  }

  @Post('register')
  registerUser(@Body() user: CreateUserDto, @Res() res: Response) {
    res.send(user);
  }
}
