export interface IModelListResponse {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  modifiedBy: string
  createdBy: string
  brand: IModelBrand
}

export interface IModelBrand {
  id: number
  name: string
}

