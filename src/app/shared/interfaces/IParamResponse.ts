export interface IParamResponse {
  id: number
  param: string
  description: string
  options: IParamResponseOption[]
}

export interface IParamResponseOption {
  id: number
  value: string
  label: string
  parentParamId?: number
}

export interface IParamParentResponse {
  id: number
  value: string
  label: string
}
