import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("clients").del();

    // Inserts seed entries
    await knex("clients").insert([
        { secure_id: uuidv4(), user_id: 1, balance: 200 },
        { secure_id: uuidv4(), user_id: 2, balance: 100 },
    ]);
}
