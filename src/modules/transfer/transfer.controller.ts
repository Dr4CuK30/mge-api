import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Permissions } from 'src/shared/decorators/permission.decorator';
import { ExtendedRequest } from 'src/shared/dtos/extended-request.dto';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';
import { UpdateTransfersDto } from './dtos/update-transfer.dto copy';
import { CreateTransfersDto } from './dtos/create-transfer.dto';
import { Permission } from 'src/shared/enums/permissions.enum';
import { ProjectGuard } from 'src/shared/guards/project.guard';
import { JwtAuthGuard } from '../../shared/guards/jwt.guard';
import { GetTransfersDto } from './dtos/get-transfer.dto';
import { TransferService } from './transfer.service';

@UseGuards(JwtAuthGuard, PermissionsGuard, ProjectGuard)
@Controller({
  version: '1',
  path: 'transfer',
})
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Permissions(Permission.VIEW_TRANSFERS)
  @Get()
  getTransfers(@Query() query: GetTransfersDto) {
    return this.transferService.getTransfers(query);
  }

  @Permissions(Permission.CREATE_TRANSFERS)
  @Post()
  createTransfer(
    @Body() data: CreateTransfersDto,
    @Req() req: ExtendedRequest,
  ) {
    return this.transferService.createTransfer(data, req.user);
  }

  @Permissions(Permission.DELETE_TRANSFERS)
  @Delete(':transferId')
  deleteTransfer(@Param('transferId') id: string) {
    return this.transferService.deleteTransfer(+id);
  }

  @Permissions(Permission.EDIT_TRANSFERS)
  @Put(':transferId')
  updateTransfer(
    @Param('transferId') id: string,
    @Body() data: UpdateTransfersDto,
  ) {
    return this.transferService.updateTransfer(+id, data);
  }
}
