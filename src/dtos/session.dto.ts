import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  public userId: string;

  @IsString()
  public sessionToken: string;

  @IsString()
  public expiresAt: Date;
}
