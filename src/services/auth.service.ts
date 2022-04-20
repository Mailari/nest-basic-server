import { UserService } from './user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user && user.password === pass) {
      const payload = { email };
      const token = sign(payload, 'secret', { expiresIn: '1h' });
      return { token };
    }
    throw new BadRequestException('Invalid credentials');
  }

  async register(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByQuery({ email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const userData: any = { email, password };
    return this.userService.create(userData);
  }
}
