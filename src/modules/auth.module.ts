import { Module } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { AuthController } from './../controllers/auth.controller';
import { UserService } from './../services/user.service';
import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
