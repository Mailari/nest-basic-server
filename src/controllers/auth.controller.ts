import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from './../pipes/validation.pipe';
import { userCreateSchema } from '../validations/product.validation.schema';
import { User } from './../entities/user.entity';
import { AuthService } from './../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  async login(@Body() user: User): Promise<any> {
    return this.authService.login(user.email, user.password);
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user.email, user.password);
  }
}
