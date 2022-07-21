export interface Client {
  id: number;
  secure_id: string;
  user_id: number;
  balance: number;
  created_at: Date;
  updated_at: Date;
}