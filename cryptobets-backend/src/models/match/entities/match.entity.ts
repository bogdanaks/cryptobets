import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt, DataType,
} from 'sequelize-typescript'

@Table({
  tableName: 'matches',
  timestamps: false,
})

export class Match extends Model {
  @PrimaryKey
  @Column
  id: string

  @Default(true)
  @Column
  is_enable: boolean

  @Column
  title: string

  @Column
  sport_slug: string

  @Column
  match_slug: string

  @Column
  match_type: string

  @Column
  status: number

  @Column
  winner_id: number

  @Column(DataType.JSON)
  team_one: any

  @Column(DataType.JSON)
  team_two: any

  @Column(DataType.ARRAY(DataType.STRING))
  available_bet_slugs: string[]

  @Column
  begin_at: Date

  @Column
  end_at: Date

  @CreatedAt
  @Column
  created_at: Date

  @UpdatedAt
  @Column
  updated_at: Date
}
