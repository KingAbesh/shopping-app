import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
