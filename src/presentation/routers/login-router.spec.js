const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-prams-error");
const UnauthorizedError = require("../helpers/unauthorized-error");

const makeSut = () =>{
  class AuthUseCaseSpy {
    auth (email, password){
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
} 

describe('Login Router', () => {
  test('should return 400 on no email provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  });

  test('should return 500 on httpRequest dont have a body provided', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  });

  // test('should return 200 on all credentials valid', () => {
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       email: '123@email.com',
  //       password: '123123'
  //     }
  //   }
  //   const httpResponse = sut.route(httpRequest)
  //   expect(httpResponse.statusCode).toBe(200)
  // });

  test('should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: '123@email.com',
        password: '123123'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  });

  test('should return 401 on invalid credentails provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: '123@email_invalid.com',
        password: '123123_invalid'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  });
});