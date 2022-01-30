import { IsString } from 'class-validator';

export class GetMatchByIdParamDto {
  @IsString()
  matchId: string;
}
