
import { IsUUID, IsDateString } from 'class-validator';

export class CreateShiftDto {
  @IsUUID()
  userId: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;
}
