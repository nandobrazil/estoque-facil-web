export interface IUserListResponse {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'SELLER';
  created_at: string;
  updated_at: string;
}
