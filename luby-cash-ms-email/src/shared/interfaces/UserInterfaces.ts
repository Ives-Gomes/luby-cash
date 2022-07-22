import { ExecOptionsWithStringEncoding } from "child_process";

export interface User {
  id: number;
	secure_id: string;
	status_id: number;
	full_name: string;
	cpf: string;
	email: string;
	monthly_income: number;
	created_at: string;
	updated_at: string;
	roles: [
		{
			id: number;
			secure_id: string;
			name: string;
			description: string;
			created_at: string;
			updated_at: string;
		}
	],
}