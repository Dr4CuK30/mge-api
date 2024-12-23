import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Permission } from 'src/modules/user/entities/permission.entity';
import { PERMISSIONS_KEY } from 'src/shared/constants/general.constants';
import { CustomHttpException } from '../errors/custom-exceptions';
import { errorTypes } from '../errors/error-types';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user;
    const userPermissions = user.roles
      .flatMap((role) => role.permissions)
      .map((permission) => permission.name);

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (
      !requiredPermissions ||
      requiredPermissions.every((per) => userPermissions.includes(per))
    ) {
      return true;
    }
    throw new CustomHttpException(errorTypes.INSUFIICIENT_PERMISSIONS, {
      requiredPermissions,
      userPermissions,
    });
  }
}
