export interface IAuthResponse {
  message: string
  timestamp: string
  data: IAuthData
}

export interface IAuthData {
  userId: number
  name: string
  username: string
  role: string
  email: string
  token: string
  refreshToken: string
}
