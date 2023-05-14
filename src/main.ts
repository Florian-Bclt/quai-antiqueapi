import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 8080;

  const host = '0.0.0.0';

  await app.listen(port, host, () => {
    console.log(`Application en cours d'exécution sur le port ${host}:${port}`);
  });
  
}
bootstrap();
