import { UserService } from './user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly config: ConfigService) {}

  async login(email: string, pass: string): Promise<any> {
    const secret = this.config.get('JWT_SECRET');
    const user = await this.userService.findOne({ email });
    if (user && user.password === pass) {
      const payload = { email };
      const token = sign(payload, process.env.JWT_SECRET ?? secret, { expiresIn: '1h' });
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
