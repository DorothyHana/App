const mongoose = require('mongoose')
const cryptoRandomString = require('crypto-random-string')
const Schema = mongoose.Schema

const AuthCodeType = require('actions/auth_code')

const AuthCode = new Schema({
  type: String,
  userID: String,
  userInfo: {
    userType: String,
    email: String,
    password: String,
    phone: String,
    name: String,
    studentInfo: {
      grade: Number,
      class: Number,
      number: Number,
      room: Number
    },
    administratorInfo: {
      responsibility: String
    }
  },
  code: String
})

AuthCode.statics.generateStudentCode = async function (studentInfo) {
  let authCode = new this({
    type: AuthCodeType.STUDENT,
    userInfo: {
      userType: AuthCodeType.STUDENT,
      name: studentInfo.name,
      studentInfo: {
        grade: studentInfo.grade,
        class: studentInfo.class,
        number: studentInfo.number,
        room: studentInfo.room
      }
    },
    code: cryptoRandomString({ length: 6 })
  })

  await authCode.save()

  return authCode
}

AuthCode.statics.generateAdministratorCode = async function (administratorInfo) {
  let authCode = new this({
    type: AuthCodeType.ADMINISTRATOR,
    userInfo: {
      userType: AuthCodeType.ADMINISTRATOR,
      name: administratorInfo.name,
      administratorInfo: {
        responsibility: administratorInfo.responsibility
      }
    },
    code: cryptoRandomString({ length: 6 })
  })

  let result = await authCode.save()

  console.log(result)

  return authCode
}

AuthCode.statics.generateDeviceCode = async function (deviceInfo) {
  let authCode = new this({
    type: AuthCodeType.DEVICE,
    userID: deviceInfo.userID,
    code: cryptoRandomString({ length: 6, characters: '1234567890' })
  })

  let result

  try {
    result = await authCode.save()
  } catch {
    return {}
  }

  return result
}

AuthCode.statics.validateCode = async function (_code) {
  let foundUser = await this.findOne({ code: _code }).exec()

  return foundUser
}

AuthCode.statics.findStudentCode = async function () {
  let studentCode = await this.find({ type: AuthCodeType.STUDENT }).exec()

  return studentCode
}

AuthCode.statics.findAdministratorCode = async function () {
  let administratorCode = await this.find({ type: AuthCodeType.ADMINISTRATOR }).exec()

  return administratorCode
}

AuthCode.statics.findDeviceCode = async function () {
  let deviceCode = await this.find({ type: AuthCodeType.DEVICE }).exec()

  return deviceCode
}

AuthCode.statics.revokeCode = async function (codes) {
  let result = await this.deleteMany({ code: codes }).exec()

  return result
}

const _authCode = mongoose.models.AuthCode || mongoose.model('AuthCode', AuthCode, 'AuthCode')

module.exports = _authCode
