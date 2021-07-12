/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
'use strict'
const crypto = require('crypto')
const moment = require('moment')
const User = use('App/Models/User')
const Mail = use('Mail')
class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
      await Mail.send(
        ['forgotpass'],
        { email: user.email, token: user.token, link: `${request.input('redirect_url')}?${user.token}` },
        message => {
          message
            .from('hell@laHell.com')
            .to(user.email)
            .subject('Reset Password!')
        }
      )
      return user
    } catch (err) {
      console.log(err)
        .status(err.status)
        .send({ error: { message: 'Something went Wrong' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)
      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Opss parece que seu token expirou' } })
      }
      user.token = null
      user.token_created_at = null
      user.password = password
      await user.save()
      return user
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Deu erro' } })
    }
  }
}

module.exports = ForgotPasswordController
