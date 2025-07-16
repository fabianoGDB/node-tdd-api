const MissingParamError = require("./missing-prams-error");
const UnauthorizedError = require("./unauthorized-error");

module.exports = class HttpResponse {
  static badRequest(paramName){
    return {
        statusCode: 400,
        body: new MissingParamError(paramName)
      }
  }
  static internalError(){
    return {
        statusCode: 500
      }
  }static unauthorizedError(){
    return {
        statusCode: 401,
        body: new UnauthorizedError()
      }
  }
  // static success(){
  //   return {
  //       statusCode: 200
  //     }
  // }
}