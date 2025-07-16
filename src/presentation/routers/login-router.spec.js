const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-prams-error");

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