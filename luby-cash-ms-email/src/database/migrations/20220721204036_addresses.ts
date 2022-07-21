import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addresses', (table) => {
    table.increments('id').unsigned().unique().notNullable()
    table.uuid('secure_id').unique().notNullable()

    table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .notNullable()
        .onDelete('CASCADE')

    table.string('zip_code', 50)
    table.string('state', 2).notNullable()
    table.string('city', 50).notNullable()
    table.string('street', 250).notNullable()
    table.string('district', 50)
    table.integer('number').unsigned()
    table.string('complement', 250)

    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addresses')
}

