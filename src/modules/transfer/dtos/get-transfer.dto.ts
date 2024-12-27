import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTransfersDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  projectId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  organizationalUnitId: number;
}
