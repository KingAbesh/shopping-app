import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async registerUser(@Body() user: CreateUserDto, @Res() res: Response) {
    try {
      const ok = await this.userService.createUser(user, res);
      if (ok) res.send({ success: true, message: 'successfully created user' });
    } catch (e) {
      console.log(e);
      res.send({
        success: false,
        message: 'there was an error creating a new user',
      });
    }
  }
}
