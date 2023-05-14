import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 8080;

  await app.listen(port, () => {
    console.log(`Application en cours d'exécution sur le port ${port}`);
  });
  
}
bootstrap();
