import { MatchService } from './match.service';
import { GetMatchByIdParamDto } from './dto/get-match-by-id.dto';
import { GetAllMatchesQueryDto } from './dto/get-all-matches-query.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    getAllMatches(query?: GetAllMatchesQueryDto): unknown;
    getMatchById(param?: GetMatchByIdParamDto): unknown;
}
