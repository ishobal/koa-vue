import { UserSchema } from '../schemas/index'
UserSchema.sync({ force: false })

class UserModel {
  static async create (params = {}) {
    const rs = await UserSchema.create({ username: '12340' + Math.random() })
    return rs
  }
}

module.exports = UserModel
