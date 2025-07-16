const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-prams-error");
const UnauthorizedError = require("../helpers/unauthorized-error");
const ServerError = require("../helpers/server-error");

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.accessToken;
    }
  }

  return new AuthUseCaseSpy();
};

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    auth() {
      throw new Error();
    }
  }
  return new AuthUseCaseSpy();
};

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCase();
  authUseCaseSpy.accessToken = "valid_token";
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut,
    authUseCaseSpy,
  };
};

describe("Login Router", () => {
  test("should return 400 on no email provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "123123",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("should return 400 on no password provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "123@email.com",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("should return 500 on httpRequest provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.route();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("should return 500 on httpRequest dont have a body provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("should call AuthUseCase with correct params", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "123@email.com",
        password: "123123",
      },
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  test("should return 500 with no AuthUseCase is provided", async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "123@email.com",
        password: "123123",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("should return 500 with no AuthUseCase is provided but dont have the auth method", async () => {
    const authUseCaseSpy = class AuthUseCaseSpy {};
    const sut = new LoginRouter(authUseCaseSpy); // new LoginRouter({})
    const httpRequest = {
      body: {
        email: "123@email.com",
        password: "123123",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("should return 500 with no AuthUseCase throws", async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError();
    const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: "123@email.com",
        password: "123123",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("should return 401 on invalid credentails provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null;
    const httpRequest = {
      body: {
        email: "123@email_invalid.com",
        password: "123123_invalid",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });

  test("should return 200 on valid credentails provided", async () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "123@email_valid.com",
        password: "123123_valid",
      },
    };
    const httpResponse = await sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
  });
});
