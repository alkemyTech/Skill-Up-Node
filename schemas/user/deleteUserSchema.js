const { Users } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
    id: {
        custom: {
          options: async (value, { req }) => {
            const { id } = req.params;
            const exist = await Users.findByPk(id);
            console.log(exist);
            if (!exist) {
              throw new ErrorObject("the id does not exist in the database");
            }
          },
        },
      },
}