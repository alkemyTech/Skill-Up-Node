
// const loginSchema = [
//   check("email").notEmpty().isEmail(),
//   check("password").notEmpty(),
// ];

module.exports = {
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: "please enter email"
    }
  },
  password: {
    in: ['body'],
    notEmpty: true,
    errorMessage: "enter password"
  }
}