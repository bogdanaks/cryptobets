import axios from 'axios'
import { GetMatchByIdResponse } from './api-interfaces'

const api = axios.create({
  baseURL: 'http://localhost:3008/',
})

export const getMatchById = async (matchId: string): Promise<GetMatchByIdResponse> => {
  const { data } = await api.get(`matches/${matchId}`)
  return data.data
}

export const getAllMatches = async (sport?: string): Promise<GetMatchByIdResponse[]> => {
  const { data } = await api.get(`matches`, {
    params: {
      sport,
    },
  })
  return data.data
}
