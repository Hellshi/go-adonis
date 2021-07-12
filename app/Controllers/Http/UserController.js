/* eslint-disable no-unused-vars */
'use strict'
const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)
    return response.json({ message: 'Soft hearts eletric souls' })
  }
}

module.exports = UserController
