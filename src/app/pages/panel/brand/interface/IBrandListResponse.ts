export interface IBrandListResponse {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  modifiedBy: string
  createdBy: string
  category: IBrandCategory
}

export interface IBrandCategory {
  id: number
  name: string
}

