import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MessagesCustom from '../messagesCustom'

export default class StoreValidator extends MessagesCustom {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    full_name: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g),
    ]),
    email: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(8),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    cpf: schema.string({ trim: true }, [
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.unique({ table: 'users', column: 'cpf' }),
    ]),
    password: schema.string({ trim: true }, [rules.maxLength(50)]),
    role: schema.string({ trim: true }, [rules.required()]),
    monthlyIncome: schema.number([rules.unsigned()]),
  })
}
