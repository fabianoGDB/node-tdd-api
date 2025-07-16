const MissingParamError = require("./missing-prams-error");
const ServerError = require("./server-error");
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
        statusCode: 500,
        body: new ServerError()
      }
  }static unauthorizedError(){
    return {
        statusCode: 401,
        body: new UnauthorizedError()
      }
  }
  static success(data){
    return {
        statusCode: 200,
        body: data
      }
  }
}