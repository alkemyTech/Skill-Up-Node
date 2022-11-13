module.exports = {
  id: {
    in: ["params"],
    notEmpty: {
      errorMessage: "id is null"
    },
    isNumeric: {
      errorMessage: "id must be numeric"
    }
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
  email: {
    notEmpty:{
      errorMessage:"email is null"
    },   
    isEmail: {
      errorMessage: "please enter a correct email"
    },
  }

}