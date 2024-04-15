import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateUserDTO {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  displayName: string;
}
