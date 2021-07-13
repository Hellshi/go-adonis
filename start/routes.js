
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('user', 'UserController.store').validator('User')
Route.post('session', 'SessionController.store').validator('Session')
Route.post('forgot', 'ForgotPasswordController.store').validator('ForgotPass')
Route.put('forgot', 'ForgotPasswordController.update').validator('UpdatePass')
Route.get('file/:id', 'FileController.show')

Route.group(() => {
  Route.resource('projects', 'ProjectController').apiOnly().validator(new Map(
    [
      [
        ['projects.store'],
        ['Project']
      ]
    ]
  ))
  Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map(
    [
      [
        ['projects.tasks.store'],
        ['Tasks']
      ]
    ]
  ))
  Route.post('file', 'FileController.store')
}).middleware(['auth'])
