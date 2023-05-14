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
import { ReservationModule } from './reservation/reservation.module';
import { GalleryModule } from './gallery/gallery.module';
import { DashboardModule } from './dashboard/dashboard.module';

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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        uri: configService.get('POSTGRESQL_URI'),
        host: configService.get('POSTGRESQL_ADDON_HOST'),
        port: parseInt(configService.get('POSTGRESQL_ADDON_PORT')),
        username: configService.get('POSTGRESQL_ADDON_USER'),
        password: configService.get('POSTGRESQL_ADDON_PASSWORD'),
        database: configService.get('POSTGRESQL_ADDON_DB'),
        entities: [join(__dirname, '**', '*.model.{ts,js}')],
        synchronize: false, 
        // synchronize: true uniquement en dev sinon utiliser les migrations
      })
    }),
    TableModule,
    AuthModule,
    UserModule,
    ProductsModule,
    MenuModule,
    HourModule,
    ReservationModule,
    GalleryModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
