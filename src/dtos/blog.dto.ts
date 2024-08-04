import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  public authorId: string;

  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsArray()
  @IsOptional()
  public tags?: string[];
}
