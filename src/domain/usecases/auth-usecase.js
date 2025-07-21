const { MissingParamError } = require("../../utils/erros");

module.exports = class AuthUseCase {
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

    const user = await this.loadUserByEmailRepository.load(email);
    if (!user) {
      return null;
    }

    return user;
  }
};

// if (!this.loadUserByEmailRepository) {
//   throw new MissingParamError("loadUserByEmailRepository");
// }
// if (!this.loadUserByEmailRepository.load) {
//   throw new InvalidParamError("loadUserByEmailRepository");
// }
