import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Status from 'App/Models/Status'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'status'

    await Status.updateOrCreateMany(uniqueKey, [
      {
        status: 'Pending',
      },
      {
        status: 'Approved',
      },
      {
        status: 'Disapproved',
      },
    ])
  }
}
