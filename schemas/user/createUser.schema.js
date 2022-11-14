module.exports = {
  email: {
    isEmail: {
      errorMessage: "please enter a correct email"
    },
    notEmpty: {
      errorMessage: "email is null"
    },
  },
  firstName: {
    notEmpty: {
      errorMessage:"firstName is null"
    }
  },
  lastName: {
    notEmpty:{
      errorMessage:"lastName is null"
    }
  },
  password: {
    notEmpty:{
      errorMessage:"password is null"
    }
  },
};
