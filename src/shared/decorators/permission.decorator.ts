import { PERMISSIONS_KEY } from 'src/shared/constants/general.constants';
import { Permission } from '../enums/permissions.enum';
import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
