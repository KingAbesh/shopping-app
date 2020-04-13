import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Response } from 'express';
import { CreateUserDto } from './dtos/createuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto, res: Response): Promise<User> {
    const existingUser = await this.usersRepository.find({
      email: user.email.toLowerCase(),
    });

    if (!user.email || !user.password) {
      res.send({
        success: false,
        message: 'All fields are required',
      });
      return;
    }

    if (existingUser.length > 0) {
      res.send({
        success: false,
        message: 'A user with this given email already exists',
      });
      return;
    }

    return await this.usersRepository.save(this.usersRepository.create(user));
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return (await this.usersRepository.find({ email }))[0];
  }
}
