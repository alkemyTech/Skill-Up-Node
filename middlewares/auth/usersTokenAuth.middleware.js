const { endpointResponse } = require("../../helpers/success");
const { verify } = require("../jwt/jwt-methods");

require("dotenv").config();

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  try {
    if (!header) {
      endpointResponse({
        res,
        code: 403,
        message: "You must go to login",
      });
    }

    const token = header.split(" ")[1];
    const payload = verify(token);

    if (!payload) {
      endpointResponse({
        res,
        code: 403,
        message: "Access not authorized",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
