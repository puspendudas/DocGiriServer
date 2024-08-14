import { IsString, IsEmail, IsDate, IsOptional, IsEnum, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public googleId: string;

  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public profilePicture?: string;

  @IsString()
  @IsOptional()
  public dateOfBirth?: string;

  @IsEnum(['Male', 'Female', 'Other'])
  @IsOptional()
  public gender?: string;

  @IsArray()
  @IsOptional()
  public medicalHistory?: Array<{
    symptomId: string;
    diagnosisDate: Date;
    treatmentId: string;
  }>;
}

export class GoogleLoginDto {
  @IsString()
  public googleId: string;
}
