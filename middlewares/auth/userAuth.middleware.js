const { ErrorObject } = require("../../helpers/error");
const { endpointResponse } = require("../../helpers/success");
const { encode, decode } = require("../jwt/jwt-methods");

module.exports = async (req, res, next) => {
  //Get Token from Headears
  const token = req.headers.authorization.split(" ")[1];

  //Decode Token
  const tokenDecoded = await decode(token);

  //Get User Id Form Token
  const userTokenId = tokenDecoded.payload.id;

  //Get Id From Paramas
  const paramsId = req.params.id;

  //Get roleId from Token
  const userRole = tokenDecoded.payload.roleId;

  try {
    //Check if user is Admin
    if (!(userRole == 1)) {
      // Check if userID match
      if (!(userTokenId == paramsId)) {
        endpointResponse({
          res,
          code: 403,
          message: "access denied",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    const err = new ErrorObject(error, 401);
    res.status(401).send(error);
  }
};
