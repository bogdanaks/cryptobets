import { IsOptional } from 'class-validator'

export class GetAllMatchesQueryDto {
  @IsOptional()
  sport?: string
}
