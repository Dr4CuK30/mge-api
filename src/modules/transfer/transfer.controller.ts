import { Permissions } from 'src/shared/decorators/permission.decorator';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Permission } from 'src/shared/enums/permissions.enum';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { User } from '../user/entities/user.entity';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller({
  version: '1',
  path: 'transfer',
})
export class TransferController {
  constructor() {}

  @Permissions(Permission.VIEW_TRANSFERS)
  @Get()
  login(@Request() req: { user: Partial<User> }) {
    console.log(req.user);
  }
}
