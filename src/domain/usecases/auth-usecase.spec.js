const { MissingParamError } = require("../../utils/erros");
class AuthUseCase {
  async auth(email) {
    if (!email) {
      throw new MissingParamError("email");
    }
  }
}

describe("Auth UseCase", () => {
  test("should throw if no email isn't provided", async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth("");
    expect(promise).rejects.toThrow(new MissingParamError("email"));
  });
});
