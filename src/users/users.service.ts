// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/Enam/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find({ relations: ['shifts'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: ['shifts'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(dto);
    return this.usersRepo.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.usersRepo.save(user);
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    await this.usersRepo.update(id, { role });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepo.remove(user);
  }
}
