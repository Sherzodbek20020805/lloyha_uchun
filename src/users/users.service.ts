// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/Enam/user-role.enum';
import { watch } from 'fs';

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
  const user = await this.usersRepo.findOne({ where: { id }, relations: ['shifts'] });
  if (!user) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
  return user;
}


  create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(dto);
    return this.usersRepo.save(user);
  }

  // Masalan, rolni yangilash:
  async updateRole(id: string, role: UserRole): Promise<User> {
    await this.usersRepo.update(id, { role });
    return this.findOne(id);
  }
}
