const { MissingParamError } = require("../../utils/erros");
class AuthUseCase {
  constructor(loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
  }

  async auth(email, password) {
    if (!email) {
      throw new MissingParamError("email");
    }
    if (!password) {
      throw new MissingParamError("password");
    }

    await this.loadUserByEmailRepository.load(email);
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

  test("should call LoadUserByEmailRepository with correct email", async () => {
    class LoadUserByEmailRepositorySpy {
      async load(email) {
        this.email = email;
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy);
    await sut.auth("any_email@mail.com", "any_password");
    expect(loadUserByEmailRepositorySpy.email).toBe("any_email@mail.com");
  });
});
