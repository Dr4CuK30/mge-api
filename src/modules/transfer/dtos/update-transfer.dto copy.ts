import { CreateTransfersDto } from './create-transfer.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTransfersDto extends PartialType(CreateTransfersDto) {
  @IsOptional()
  @IsNumber()
  transmitterId?: number;
}
