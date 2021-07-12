/* eslint-disable no-unreachable */
'use strict'
const crypto = require('crypto')
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
}

module.exports = ForgotPasswordController
