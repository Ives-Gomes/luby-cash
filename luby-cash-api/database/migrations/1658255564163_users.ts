import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().unique().notNullable()
      table.uuid('secure_id').unique().notNullable()
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('statuses')
        .notNullable()
        .onDelete('CASCADE')

      table.string('full_name', 50).notNullable()
      table.string('cpf', 14).unique().notNullable()
      table.string('email', 50).unique().notNullable()
      table.string('password', 250).notNullable()
      table.decimal('monthly_income', 9, 2).defaultTo(0).unsigned().notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
