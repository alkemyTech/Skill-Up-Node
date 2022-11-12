const jwt = require("jsonwebtoken");
const { endpointResponse } = require("../../helpers/success");
const { ErrorObject } = require("../../helpers/error");
require("dotenv").config();

module.exports = async (req, res, next) => {
    
  //Get Token from Headears
  const token = req.headers.authorization.split(" ")[1];

  try {

    //Check thath token exist
    if (!token) {
      endpointResponse({
        res,
        code: 404,
        message: "missing token",
      });
    } else {

      //Check token validation
      await jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
          endpointResponse({
            res,
            code: 403,
            message: "access not authorized",
            body: err,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (error) {
    const err = new ErrorObject(error, 401);
    res.status(401).send(err);
  }
};
