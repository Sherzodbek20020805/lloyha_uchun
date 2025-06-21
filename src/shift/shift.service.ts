
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './entities/shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepo: Repository<Shift>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateShiftDto): Promise<Shift> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const shift = this.shiftRepo.create({
      user,
      start_time: new Date(dto.start_time),
      end_time: new Date(dto.end_time),
    });

    return this.shiftRepo.save(shift);
  }

  findAll(): Promise<Shift[]> {
    return this.shiftRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Shift> {
    const shift = await this.shiftRepo.find({
      where: { id },
      relations: ['user'],
    }).then(arr => arr[0]);

    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }

  async update(id: number, dto: UpdateShiftDto): Promise<Shift> {
    const shift = await this.findOne(id);
    if (dto.start_time) shift.start_time = new Date(dto.start_time);
    if (dto.end_time) shift.end_time = new Date(dto.end_time);
    return this.shiftRepo.save(shift);
  }

  async remove(id: number): Promise<void> {
    const shift = await this.findOne(id);
    await this.shiftRepo.remove(shift);
  }
}
