'use strict'

class ForgotPass {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgotPass
