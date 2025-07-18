const { MissingParamError } = require("../../utils/erros");
class AuthUseCase {
  async auth(email, password) {
    if (!email) {
      throw new MissingParamError("email");
    }
    if (!password) {
      throw new MissingParamError("password");
    }
  }
}

describe("Auth UseCase", () => {
  test("should throw if no email isn't provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });

  test("should throw if no password isn't provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth("any_email@mail.com");
    expect(promise).rejects.toThrow(new MissingParamError("password"));
  });
});
