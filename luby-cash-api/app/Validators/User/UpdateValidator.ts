import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MessagesCustom from '../messagesCustom'

export default class StoreValidator extends MessagesCustom {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    full_name: schema.string.optional({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
      rules.regex(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g),
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(8),
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true,
        whereNot: {
          secure_id: this.refs.id,
        },
      }),
    ]),
    cpf: schema.string.optional({ trim: true }, [
      rules.regex(/^\d{3}.\d{3}.\d{3}-\d{2}$/),
      rules.unique({
        table: 'users',
        column: 'cpf',
        whereNot: {
          secure_id: this.refs.id,
        },
      }),
    ]),
    password: schema.string.optional({ trim: true }, [rules.maxLength(50)]),
    role: schema.string.optional({ trim: true }, []),
    monthlyIncome: schema.number.optional([rules.unsigned()]),
  })
}
