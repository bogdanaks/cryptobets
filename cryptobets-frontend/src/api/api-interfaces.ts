import { Team } from '@interfaces/match'

export interface GetMatchByIdResponse {
  id: string
  is_enable: boolean
  status: number
  match_slug: string
  match_type: string
  sport_slug: string
  title: string
  winner_id: number
  team_one: Team
  team_two: Team
  available_bet_slugs: string[]
  begin_at: Date
  end_at: Date
  created_at: Date
  updated_at: Date
}
