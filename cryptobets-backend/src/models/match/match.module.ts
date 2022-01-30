import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { matchesProviders } from 'providers/repositories/matches.providers'
import { DatabaseModule } from 'providers/database/database.module'

@Module({
  exports: [MatchService],
  controllers: [MatchController],
  imports: [DatabaseModule],
  providers: [
    MatchService,
    ...matchesProviders,
  ],
})
export class MatchModule {}
