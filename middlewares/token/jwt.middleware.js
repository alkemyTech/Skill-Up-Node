const jwt = require("jsonwebtoken");
const { ErrorObject } = require("../../helpers/error");
require("dotenv").config();

module.exports = {
  decode: async function (token) {
    const tokenDecode = await jwt.decode(token);
    return tokenDecode;
  },
  encode: async function (payload) {
    const token = await jwt.sign({payload}, process.env.SECRET, {
      expiresIn: 86400,
    });
    return token;
  },
  verify: async function (req, res, next) {
    try {
      const token = req.headers["authorization"]
      await jwt.verify(token, process.env.SECRET);
      next();
    } catch (error) {
      const err = new ErrorObject(error, 401);
      res.status(401).send(err);
    }
  },
};
