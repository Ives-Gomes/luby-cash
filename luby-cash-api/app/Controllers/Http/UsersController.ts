/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User'
import Role from 'App/Models/Role'

import StoreValidator from 'App/Validators/User/StoreValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'
import Status from 'App/Models/Status'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    const { page, perPage, noPaginate, ...inputs } = request.qs()

    try {
      if (noPaginate) {
        return User.query()
          .preload('roles', (roleTable) => {
            roleTable.select('id', 'name')
          })
          .preload('phones')
          .filter(inputs)
      }

      const users = await User.query()
        .preload('roles', (roleTable) => {
          roleTable.select('id', 'name')
        })
        .preload('phones')
        .filter(inputs)
        .paginate(page || 1, perPage || 10)

      return response.ok(users)
    } catch (error) {
      return response.badRequest({ message: 'Error in users list', originalError: error.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const userSecureId = params.id

    try {
      const user = await User.query()
        .where('secure_id', userSecureId)
        .preload('roles')
        .preload('phones')
        .firstOrFail()

      return response.ok(user)
    } catch (error) {
      return response.notFound({ message: 'User not found', originalError: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(StoreValidator)

    const bodyUser = request.only(['full_name', 'cpf', 'email', 'password', 'monthlyIncome'])
    const bodyRole = request.only(['role'])

    if (bodyRole.role === 'admin') {
      return response.badRequest({ message: 'Only admins can create admins' })
    }

    let userCreated

    const trx = await Database.beginGlobalTransaction()

    try {
      bodyUser['status_id'] = 1

      userCreated = await User.create(bodyUser, trx)

      const role = await Role.findBy('name', bodyRole.role)
      if (role) await userCreated.related('roles').attach([role.id], trx)

      const status = await Status.findBy('status', 'client')
      if (status) await userCreated.related('status').attach([status.id], trx)
    } catch (error) {
      trx.rollback()

      return response.badRequest({ message: 'Error in create user', originalError: error.message })
    }

    let user

    try {
      user = await User.query()
        .where('id', userCreated.id)
        .preload('roles')
        .preload('phones')
        .firstOrFail()
    } catch (error) {
      trx.rollback()

      return response.badRequest({
        message: 'Error in find user',
        originalError: error.message,
      })
    }

    trx.commit()

    return response.ok(user)
  }

  public async storeAdmin({ request, response }: HttpContextContract) {
    await request.validate(StoreValidator)

    const bodyUser = request.only(['full_name', 'cpf', 'email', 'password', 'monthlyIncome'])
    const bodyRole = request.only(['role'])

    let userCreated

    const trx = await Database.beginGlobalTransaction()

    try {
      bodyUser['status_id'] = 1

      userCreated = await User.create(bodyUser, trx)

      const role = await Role.findBy('name', bodyRole.role)
      if (role) await userCreated.related('roles').attach([role.id], trx)

      const status = await Status.findBy('status', 'admin')
      if (status) await userCreated.related('status').attach([status.id], trx)
    } catch (error) {
      trx.rollback()

      return response.badRequest({ message: 'Error in create user', originalError: error.message })
    }

    let user

    try {
      user = await User.query()
        .where('id', userCreated.id)
        .preload('roles')
        .preload('phones')
        .firstOrFail()
    } catch (error) {
      trx.rollback()

      return response.badRequest({
        message: 'Error in find user',
        originalError: error.message,
      })
    }

    trx.commit()

    return response.ok(user)
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(UpdateValidator)

    const userSecureId = params.id
    const bodyUser = request.only(['name', 'cpf', 'email', 'password', 'role', 'monthlyIncome'])

    let userUpdated

    const trx = await Database.beginGlobalTransaction()

    try {
      userUpdated = await User.findByOrFail('secure_id', userSecureId)

      userUpdated.useTransaction(trx)

      await userUpdated.merge(bodyUser).save()
    } catch (error) {
      trx.rollback()

      return response.badRequest({ message: 'Error in update user', originalError: error.message })
    }

    let userFind

    try {
      userFind = await User.query().where('id', userUpdated.id).preload('roles').preload('phones')
    } catch (error) {
      trx.rollback()

      return response.badRequest({
        message: 'Error in find user',
        originalError: error.message,
      })
    }

    trx.commit()

    return response.ok(userFind)
  }

  public async destroy({ response, params }: HttpContextContract) {
    const userSecureId = params.id

    try {
      await User.query().where('secure_id', userSecureId).delete()

      return response.ok({ message: 'User deleted successfully' })
    } catch (error) {
      return response.notFound({ message: 'User not found', originalError: error.message })
    }
  }
}
