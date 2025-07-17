const validator = require("validator");

module.exports = { EmailValidator };

class EmailValidator {
  isValid(email) {
    return validator.isEmail(email);
  }
}
