import { Controller, Get, UseInterceptors, Param, Query } from '@nestjs/common'
import { MatchService } from './match.service';
import { ResponseInterceptor } from 'interceptors/response.interceptor';
import { GetMatchByIdParamDto } from './dto/get-match-by-id.dto';
import { GetAllMatchesQueryDto } from './dto/get-all-matches-query.dto'

@UseInterceptors(ResponseInterceptor)
@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('matches')
  async getAllMatches(@Query() query?: GetAllMatchesQueryDto) {
    return await this.matchService.getAllMatches(query.sport);
  }

  @Get('matches/:matchId')
  async getMatchById(@Param() param?: GetMatchByIdParamDto) {
    return await this.matchService.getMatchById(param.matchId);
  }
}
