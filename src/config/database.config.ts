import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';

export const config = (): any => ({
  port: Number(process.env.SEVER_PORT),
  secret: process.env.JWT_SECRET || 'secret',
  database: {
    type: 'postgres',
    synchronize: true,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'mylari',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'mylari'
  }
});

@Injectable()
export class DataBaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createTypeOrmOptions() {
    return this.config.get('database');
  }
}
