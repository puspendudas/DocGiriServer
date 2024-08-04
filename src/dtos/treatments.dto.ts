import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @IsOptional()
  public steps?: string[];

  @IsArray()
  @IsOptional()
  public medications?: string[];

  @IsArray()
  @IsOptional()
  public precautions?: string[];

  @IsArray()
  @IsOptional()
  public associatedSymptoms?: string[];
}
