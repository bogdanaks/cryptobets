import { Match } from 'models/match/entities/match.entity'

import { Repositories } from 'config/repositories'

export const matchesProviders = [
  {
    provide: Repositories.MATCHES_REPOSITORY,
    useValue: Match,
  },
]
