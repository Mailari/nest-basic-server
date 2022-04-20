import { Module } from '@nestjs/common';
import { AppController } from './../controllers/app.controller';
import { AppService } from './../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { ProductModule } from './product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 2000,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjs',
      entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
      synchronize: true
    }),
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
