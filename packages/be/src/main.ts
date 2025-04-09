import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3001', exposeHeaders: ['ETag'] }); // Enable CORS
  await app.listen(3000);
}
void bootstrap();
