import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get('port');
  console.log('Server is running on port: ' + port);

  await app.listen(port);
}
bootstrap();
