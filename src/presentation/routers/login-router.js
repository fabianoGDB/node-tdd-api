const HttpResponse = require("../helpers/http-response");
const { MissingParamError, InvalidParamError } = require("../errors");

module.exports = class LoginRouter {
  constructor(authUseCase, emailValidator) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator;
  }
  async route(httpRequest) {
    if (
      !httpRequest ||
      !httpRequest.body ||
      !this.authUseCase ||
      !this.authUseCase.auth
    ) {
      return HttpResponse.internalError();
    }

    const { email, password } = httpRequest.body;

    try {
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError("email"));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError("password"));
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError("email"));
      }
      const accessToken = await this.authUseCase.auth(email, password);
      if (!accessToken) {
        return HttpResponse.unauthorizedError();
      }
      return HttpResponse.success({ accessToken });
    } catch (error) {
      // console.error(error);
      return HttpResponse.internalError();
    }
  }
};
