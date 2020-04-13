import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { UserModule } from 'src/users/user.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, UserService, LocalStrategy]
})
export class AuthModule {}
