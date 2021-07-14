/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewMailTask = async (taskInstaces) => {
  if (!taskInstaces.user_id && !taskInstaces.dirty.user_id) { console.log('a') }
  const { email, username } = await taskInstaces.user().fetch()
  const { file } = await taskInstaces.file().fetch()
  const { title } = taskInstaces

  await Mail.send(
    ['editTask'],
    { email: email, username: username, title: title },
    message => {
      message
        .from('hell@laHell.com')
        .to(email)
        .subject('Task edition!')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file}`), {
          filename: file.name
        })
      }
    }
  )
}
