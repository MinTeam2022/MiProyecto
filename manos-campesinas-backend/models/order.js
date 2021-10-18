'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { User, Order } = models
      Order.belongsTo(User, {
        as: 'cliente',
        foreignKey: 'clienteId'
      })
      Order.belongsTo(User, {
        as: 'vendedor',
        foreignKey: 'vendedorId'
      })
    }
  };
  Order.init({
    clienteId: DataTypes.INTEGER,
    vendedorId: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};