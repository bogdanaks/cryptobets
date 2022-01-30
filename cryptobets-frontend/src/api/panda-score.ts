import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.pandascore.co/',
  headers: {
    Authorization: 'Bearer TKUNTDTEyrbk0u_2fpK4dXEC2hp5fUauwh876AVlI6BcmkjGM40',
  },
})

export const getGSGOMatches = async (): Promise<any> => {
  const { data } = await api.get('csgo/matches/upcoming?sort=begin_at')
  return data
}
