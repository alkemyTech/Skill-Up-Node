'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
  class Role extends Model {
=======
  class Roles extends Model {
>>>>>>> refs/remotes/origin/dev
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      Role.hasMany(models.User, {foreignKey: "roleId"});

    }
  };
  Role.init({
=======
      Roles.hasOne(models.Users, {foreignKey: "roleId"});

    }
  };
  Roles.init({
>>>>>>> refs/remotes/origin/dev
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
<<<<<<< HEAD
    modelName: 'Role',
  });
  return Role;
=======
    modelName: 'Roles',
  });
  return Roles;
>>>>>>> refs/remotes/origin/dev
};