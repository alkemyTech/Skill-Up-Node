

module.exports = {
  email: {
    in: ['body'],
    notEmpty:true,
    isEmail: {
      errorMessage: "please enter a valid email"
    }
  },
  password: {
    in: ['body'],
    notEmpty: true,
    errorMessage: "enter password"
  }
}