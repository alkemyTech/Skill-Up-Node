const { validationResult, checkSchema } = require("express-validator");

const validateRequestSchema = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      next();
    },
  ];
};
module.exports = { validateRequestSchema } ;
