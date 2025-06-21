// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftModule, UserModule } from './index'
import { User } from './users/entities/user.entity';
import { Shift } from './shift/entities/shift.entity';


@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT ?? 1221),
      username: process.env.DB_USER || 'postgres',
      entities: [User, Shift],
      database: process.env.DB_NAME || 'n19',
      synchronize: true, 
    }),
    UserModule,
    ShiftModule,
  ],
})
export class AppModule {}
