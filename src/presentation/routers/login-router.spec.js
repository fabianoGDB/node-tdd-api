class LoginRouter{
  route (httpRequest) {
    if(!httpRequest.body.email){
      return {
        statusCode: 400
      }
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
});