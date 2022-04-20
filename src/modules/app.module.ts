import { Module } from '@nestjs/common';
import { AppController } from './../controllers/app.controller';
import { AppService } from './../services/app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { ProductModule } from './product.module';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '2000'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'test',
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
  synchronize: true
};

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
