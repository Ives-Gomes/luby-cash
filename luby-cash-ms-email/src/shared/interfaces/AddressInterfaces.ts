export interface Address {
  id: number;
  secure_id: string;
  client_id: number;
  zip_code: string;
  state:string;
  city:string;
  street:string;
  district:string;
  number: number;
  complement: string;
  created_at: Date;
  updated_at: Date;
}