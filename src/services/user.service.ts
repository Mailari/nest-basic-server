import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async findOneByQuery(query: any): Promise<User> {
    return this.userRepo.findOne({ where: query });
  }

  async findOne(query: any): Promise<User> {
    return this.userRepo.findOneByOrFail(query).catch((err) => {
      throw new NotFoundException(err.message);
    });
  }
}
