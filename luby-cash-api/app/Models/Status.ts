import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

import User from './User'
import Role from './Role'

export default class Status extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public secureId: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @hasOne(() => User)
  // public user: HasOne<typeof User>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(role: Role) {
    role.secureId = uuidv4()
  }
}
