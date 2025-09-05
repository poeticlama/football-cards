export type PlayerType = {
  id: string
  name: string
  club: string
  image: string
  matches: number
  goals: number
  assists: number
  position: string
  rating: number
  age: number
}

export type PlayersStateType = {
  players: PlayerType[]
  currentPlayer: PlayerType | null
  loading: boolean
  error: string | null
  sortBy: string
}

export type UserDataType = {
  id: string
  username: string
  password: string
  players: PlayerType[]
}
