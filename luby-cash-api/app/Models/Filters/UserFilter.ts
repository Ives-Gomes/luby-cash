/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import User from 'App/Models/User'

export default class UserFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof User, User>

  full_name(value: string) {
    this.$query.where('name', 'LIKE', `%${value}%`)
  }

  createdAt(value: string) {
    this.$query.where('created_at', 'LIKE', `%${value}%`)
  }

  betweenDates(value: string) {
    dayjs.locale('pt-br')

    const dates = value.split('/')

    const date1 = dates[0].toString().replace('T', ' ').replace('.000-03:00', '')
    const date2 = dates[1].toString().replace('T', ' ').replace('.000-03:00', '')

    this.$query.whereBetween('created_at', [`%${date1}%`, `%${date2}%`])
  }

  status(value: string) {
    this.$query.whereHas('status', (StatusModel) => {
      StatusModel.where('status', 'LIKE', `%${value}%`)
    })
  }
}
