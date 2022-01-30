import { Module } from "@nestjs/common";
import { MatchModule } from "../match/match.module";
import { matchesProviders } from 'providers/repositories/matches.providers'

@Module({
  imports: [MatchModule],
  providers: [
    ...matchesProviders,
  ],
})
export class AppModule {}
