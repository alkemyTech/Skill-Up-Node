const { Users } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
  user: {
    custom: {
      options: async (value, { req }) => {
        const { id } = req.params;
        const exist = await Users.findByPk(id);
        if (!exist)
          throw new ErrorObject({ message: "User not found", statusCode: 404 });
      },
    },
  },
};
