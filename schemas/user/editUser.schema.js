module.exports = {
  id: {
    in: ["params"],
    isInt:true,
    errorMessage: "id is wrong"
    
  },
  email: { 
    optional:true,
    isEmail: true, 
    errorMessage: "please enter a correct email"
    
  }

}