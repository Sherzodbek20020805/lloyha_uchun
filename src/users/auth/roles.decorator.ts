import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/Enam/user-role.enum';
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);