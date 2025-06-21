// src/shifts/dto/create-shift.dto.ts
import { IsDateString, IsUUID } from 'class-validator';

export class CreateShiftDto {
  @IsUUID()
  userId: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;
}
