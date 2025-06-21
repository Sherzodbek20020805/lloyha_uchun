// src/shifts/shift.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities';
import { User } from '../users';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shift, User])],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
