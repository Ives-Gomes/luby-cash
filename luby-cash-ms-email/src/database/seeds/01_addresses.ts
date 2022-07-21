import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("addresses").del();

  const client = await knex("clients").first()

  console.log(client)

  // Inserts seed entries
  await knex("addresses").insert([
    { 
      secure_id: uuidv4(), 
      client_id: client.id, 
      zip_code: '55555-000',  
      state: 'CE',
      city: 'Fortaleza',
      street: 'of Tomorrow',
      district: 'Bairro',
      number: 225,
      complement: 'Apto 404'
    },
  ]);
}
