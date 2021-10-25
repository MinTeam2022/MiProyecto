'use strict';
const {
  Model
} = require('sequelize');
const PROTECTED_ATTRIBUTES = []
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }
  };
  User.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    username: DataTypes.STRING,
    googleId: DataTypes.STRING,
    role: DataTypes.ENUM('cliente', 'vendedor', 'admin'),
    status: DataTypes.ENUM('activo', 'inactivo'),
    documentId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};