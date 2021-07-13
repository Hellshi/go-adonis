/* eslint-disable no-unused-vars */
'use strict'

const File = use('App/Models/File')
const helpers = use('Helpers')

class FileController {
  async store ({ request, response }) {
    try {
      console.log(request.file('file'))
      if (!request.file('file')) return
      console.log('chegou aqui')
      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return response.send(file)
    } catch (err) {
      console.log(err)
      return response.status(err.status).send({ error: { mensage: err } })
    }
  }

  async show ({ params, response }) {
    try {
      const file = await File.findByOrFail('id', params.id)
      console.log(file.file)
      return response.download(helpers.tmpPath(`uploads/${file.file}`))
    } catch (err) {

    }
  }
}

module.exports = FileController
