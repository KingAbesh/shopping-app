import { Controller, Get, Res, Body, Post, Param } from '@nestjs/common';
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
      if (ok)
        res.send({
          success: true,
          statusCode: 201,
          message: 'successfully created user',
        });
    } catch (e) {
      console.log(e);
      res.send({
        success: false,
        message: 'there was an error creating a new user',
      });
    }
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(id);
    if (user) {
      res.send({
        status: true,
        statusCode: 200,
        message: 'User found successfully',
        data: [
          {
            id: user.id,
            email: user.email,
          },
        ],
      });
    } else {
      res.send({
        status: false,
        statusCode: 404,
        message: 'Could not find user',
        data: [],
      });
    }
  }
}
