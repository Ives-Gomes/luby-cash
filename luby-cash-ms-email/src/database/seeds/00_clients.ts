import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("clients").del();

    // Inserts seed entries
    await knex("clients").insert([
        { secure_id: uuidv4(), user_id: '332c2ebf-b8a9-4142-aef0-c07c83389593', balance: 200 },
        { secure_id: uuidv4(), user_id: 'ed6d3338-0adc-4cab-8c2e-dff816a82007', balance: 100 },
    ]);
}
