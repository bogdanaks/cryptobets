import { Match } from "models/match/entities/match.entity";
export declare class MatchService {
    private matchesRepository;
    constructor(matchesRepository: typeof Match);
    getAllMatches(sport?: string): unknown;
    getMatchById(matchId: string): unknown;
}
