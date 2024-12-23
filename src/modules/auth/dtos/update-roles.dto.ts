import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRolesDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsArray()
  roles: string[];
}
