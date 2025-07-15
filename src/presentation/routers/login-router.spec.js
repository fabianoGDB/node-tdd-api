class LoginRouter{
  route (httpRequest) {
    const {email, password } = httpRequest.body
    if(!email || !password){
      return {
        statusCode: 400
      }
    }

    return {
      statusCode: 200
    }
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