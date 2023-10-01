import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { MenuModule } from './menu/menu.module';
import { HourModule } from './hour/hour.module';
import { GalleryModule } from './gallery/gallery.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile:'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //     type: 'postgres',
      //     host: configService.get('DATABASE_HOST'),
      //     port: parseInt(configService.get('DATABASE_PORT')),
      //     username: configService.get('DATABASE_USER'),
      //     password: configService.get('DATABASE_PASSWORD'),
      //     database: configService.get('DATABASE_DB'),
      //     entities: [join(__dirname, '**', '*.model.{ts,js}')],
      //     synchronize: true,
      //     migrationsRun: true,
      //     logging: true,
      //     migrations: [join(__dirname, 'migrations/*{.ts,.js')]
      //   })
      useFactory: (configService: ConfigService) => {
        const postgresConfig: PostgresConnectionOptions = {
          type: 'postgres',
          host: configService.get('POSTGRESQL_ADDON_HOST'),
          port: parseInt(configService.get('POSTGRESQL_ADDON_PORT')),
          username: configService.get('POSTGRESQL_ADDON_USER'),
          password: configService.get('POSTGRESQL_ADDON_PASSWORD'),
          database: configService.get('POSTGRESQL_ADDON_DB'),
          url: configService.get('POSTGRESQL_ADDON_URI'),
          entities: [join(__dirname, '**', '*.model.{ts,js}')],
          synchronize: false,
          migrationsRun: true,
          logging: true,
          migrations: [join(__dirname, 'migrations/*{.ts,.js')]
        };
        return postgresConfig;
      }
    }),
    TableModule,
    AuthModule,
    UserModule,
    ProductsModule,
    MenuModule,
    HourModule,
    GalleryModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
