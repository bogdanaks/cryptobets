import { Sequelize } from 'sequelize-typescript'
import databaseConfig from 'config/database'

import { Match } from 'models/match/entities/match.entity'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig)
      sequelize.addModels([Match])
      return sequelize
    }
  }
]
