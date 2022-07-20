import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    const searchKeyAdmin = { email: 'admin@email.com' }
    const userAdmin = await User.updateOrCreate(searchKeyAdmin, {
      fullName: 'Admin',
      cpf: '000.000.000-00',
      email: 'admin@email.com',
      password: 'secret',
      statusId: 2,
    })
    const roleAdmin = await Role.findBy('name', 'admin')
    if (roleAdmin) await userAdmin.related('roles').attach([roleAdmin.id])

    const searchKeyClient = { email: 'client@email.com' }
    const userClient = await User.updateOrCreate(searchKeyClient, {
      fullName: 'Client',
      cpf: '000.000.000-01',
      email: 'client@email.com',
      password: 'secret',
      statusId: 1,
    })
    const roleClient = await Role.findBy('name', 'client')
    if (roleClient) await userClient.related('roles').attach([roleClient.id])
  }
}
