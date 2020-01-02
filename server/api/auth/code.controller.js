const AuthCode = require('models/auth_code')

exports.generateStudentCode = async (ctx) => {
  let studentInfo = ctx.request.body

  ctx.body = await AuthCode.generateStudentCode(studentInfo)
}

exports.generateAdministratorCode = async (ctx) => {
  let administratorInfo = ctx.request.body

  ctx.body = await AuthCode.generateAdministratorCode(administratorInfo)
}

exports.generateDeviceCode = async (ctx) => {
  let deviceInfo = {
    userID: userID
  }

  ctx.body = await AuthCode.generateDeviceCode(deviceInfo)
}

exports.findStudentCode = async (ctx) => {
  ctx.body = await AuthCode.findStudentCode()
}

exports.findAdministratorCode = async (ctx) => {
  ctx.body = await AuthCode.findAdministratorCode()
}

exports.findDeviceCode = async (ctx) => {
  ctx.body = await AuthCode.findDeviceCode()
}

exports.validateCode = async (ctx) => {
  let code = ctx.request.body.code

  ctx.body = await AuthCode.validateCode(code)
}

exports.revokeCode = async (ctx) => {
  let code = ctx.request.body.code

  let result = await AuthCode.revokeCode(code)

  ctx.assert(result.n === 1 && result.deleteCount === 1 && result.ok === 1, 401, 'Authentication code wasn\'t deleted properly.')

  ctx.body = 'Provided authentication code was deleted.'
}
