import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  getWelcome(res: Response): void {
    res
      .status(200)
      .send({ status: true, message: 'Successfully fetched data' });
  }
}
