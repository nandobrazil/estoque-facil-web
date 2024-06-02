export interface IProductListResponse {
  id: number
  name: string
  description: string
  costPrice: number
  salePrice: number
  imei: string
  quantity: number
  createdAt: string
  updatedAt: string
  modifiedBy: string
  createdBy: string
  model: IProductListResponseModel
}

export interface IProductListResponseModel {
  id: number
  name: string
}
