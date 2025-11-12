import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import ormConfig from './configs/orm-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductsModule, ScheduleModule.forRoot(), HttpModule,
    TypeOrmModule.forRoot({
      ...ormConfig,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
