const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  
  decode:  (token) =>  jwt.decode(token),
 
  encode: (payload) =>  jwt.sign({ payload }, process.env.SECRET, {expiresIn: 86400,}),
  
  verify:(token) => {
    try {
       jwt.verify(token, process.env.SECRET);
      return true;
    } catch (e) {
      return false;
    }
  },
};
