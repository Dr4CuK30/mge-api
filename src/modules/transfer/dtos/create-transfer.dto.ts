import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTransfersDto {
  @IsNumber()
  @Min(1)
  vehicleId: number;

  @IsNumber()
  @Min(1)
  projectId: number;

  @IsNumber()
  @Min(1)
  organizationalUnitId: number;

  @IsNumber()
  @Min(1)
  clientId: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
