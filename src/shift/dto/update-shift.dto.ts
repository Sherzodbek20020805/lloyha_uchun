
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateShiftDto {
  @IsOptional()
  @IsDateString()
  start_time?: string;

  @IsOptional()
  @IsDateString()
  end_time?: string;
}
