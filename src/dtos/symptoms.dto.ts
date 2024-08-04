import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSymptomDto {
  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @IsOptional()
  public commonCauses?: string[];

  @IsArray()
  @IsOptional()
  public possibleTreatments?: string[];
}
