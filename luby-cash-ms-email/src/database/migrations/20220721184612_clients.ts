import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('clients', (table) => {
    table.increments('id').unsigned().unique().notNullable()
    table.uuid('secure_id').unique().notNullable()

    table.integer('user_id').unsigned().notNullable()
    table.float('balance', 9, 2).defaultTo(0).unsigned().notNullable()

    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('clients')
}

