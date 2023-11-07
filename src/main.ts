import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as pg from 'pg';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 8080;

  const host = '0.0.0.0';

  // const pgConfig = {
  //   connectionString: process.env.POSTGRESQL_ADDON_URI,
  // };

  // const pgClient = new pg.Client(pgConfig)

  // pgClient.connect((err) => {
  //   if(err) {
  //     console.error('Error connecting to PostgreSQL:', err.stack);
  //   } else {
  //     console.log('Connected to PostgreSQL database');
  //   }
  // });

  await app.listen(port, host, () => {
    console.log(`Application en cours d'exécution sur le port ${host}:${port}`);
  });
  
}
bootstrap();
