
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('user', 'UserController.store')
Route.post('session', 'SessionController.store')
Route.post('forgot', 'ForgotPasswordController.store')
Route.put('forgot', 'ForgotPasswordController.update')
Route.get('file/:id', 'FileController.show')

Route.group(() => {
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.post('file', 'FileController.store')
}).middleware(['auth'])
