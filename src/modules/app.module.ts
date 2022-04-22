import { Module } from '@nestjs/common';
import { AppController } from './../controllers/app.controller';
import { AppService } from './../services/app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { ProductModule } from './product.module';
import { ConfigModule } from '@nestjs/config';
import { config, DataBaseConfig } from 'src/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({ imports: [ConfigModule], useClass: DataBaseConfig }),
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
