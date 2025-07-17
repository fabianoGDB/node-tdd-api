module.exports = {
  email: "email@mail.com",
  isEmailValid: true,
  isEmail(email) {
    return this.isEmailValid;
  },
};
