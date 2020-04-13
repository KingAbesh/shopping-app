import {
  Controller,
  Get,
  Res,
  Req,
  Body,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { ValidParam } from './dtos/param.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard) //this ensures a user is authenticated.
  @Get('/user/:id')
  async getUser(@Param('id') id: ValidParam, @Res() res: Response, @Req() req) {
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
