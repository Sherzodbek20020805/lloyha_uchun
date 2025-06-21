import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { User } from '../users';
import { UserModule } from '../users';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shift, User]),
    forwardRef(() => UserModule), 
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
