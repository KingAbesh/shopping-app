import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AuthService, UserService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
