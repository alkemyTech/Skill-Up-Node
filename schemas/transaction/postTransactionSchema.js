const { ErrorObject } = require('../../helpers/error');
const { Categories, Users } = require('../../database/models');

module.exports = {
  amount: {
    errorMessage: 'Please enter amount.',
    isNumeric: {
      errorMessage: 'Amount must be numeric.',
    },
    custom: {
      options: (amount, { req }) => {
        if (!amount > 0)
          throw new ErrorObject('Amount must be greater than 0.', 422);

        return true;
      },
    },
    trim: true,
  },
  userId: {
    custom: {
      options: async (userId, { req }) => {
        try {
          const user = await Users.findByPk(userId);
          if (!user) throw new ErrorObject('User not found.', 404);
          req.body.user = `${user.firstName} ${user.lastName}`;
        } catch (error) {
          throw error;
        }
      },
    },
  },
  categoryId: {
    custom: {
      options: async (categoryId, { req }) => {
        try {
          const category = await Categories.findByPk(categoryId);
          if (!category) throw new ErrorObject('Category not found.', 404);
          req.body.category = category.name;
        } catch (error) {
          throw error;
        }
      },
    },
  },
};
