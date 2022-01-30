import { Inject, Injectable } from '@nestjs/common'
import { Repositories } from "config/repositories";
import { Match } from "models/match/entities/match.entity";

@Injectable()
export class MatchService {
  constructor(
    @Inject(Repositories.MATCHES_REPOSITORY)
    private matchesRepository: typeof Match,
  ) {
  }

  async getAllMatches(sport?: string) {
    return await this.matchesRepository.findAll({
      where: sport ? {
        sport_slug: sport,
      } : {}
    });
  }

  async getMatchById(matchId: string) {
    return await this.matchesRepository.findOne({ where: { id: matchId } });
  }
}
