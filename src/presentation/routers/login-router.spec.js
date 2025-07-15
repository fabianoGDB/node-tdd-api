class LoginRouter{
  route (httpRequest) {
    if(!httpRequest || !httpRequest.body){
      return HttpResponse.internalError();
    }

    const {email, password } = httpRequest.body

    if(!email){
      return HttpResponse.badRequest('email');
    }
    if(!password){
      return HttpResponse.badRequest('password');
    }

    return HttpResponse.success();
  }
}


class HttpResponse {
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
  }static success(){
    return {
        statusCode: 200
      }
  }
}

class MissingParamError extends Error {
  constructor (paramName){
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
describe('Login Router', () => {
  test('should return 400 on no email provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: '123123'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  });

  test('should return 400 on no password provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: '123@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  });

  test('should return 500 on httpRequest provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  });

  test('should return 500 on httpRequest dont have a body provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  });

  test('should return 200 on all credentials valid', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: '123@email.com',
        password: '123123'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  });
});