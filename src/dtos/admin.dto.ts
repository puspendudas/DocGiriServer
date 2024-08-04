import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public role: string;

  @IsArray()
  @IsOptional()
  public permissions?: string[];
}
