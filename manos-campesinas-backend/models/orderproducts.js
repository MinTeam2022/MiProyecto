'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Product, Order, OrderProducts } = models
      Product.belongsToMany(Order, { through: OrderProducts })
      Order.belongsToMany(Product, { through: OrderProducts, as: "Products" })
    }
  };
  OrderProducts.init({
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'OrderProducts',
  });
  return OrderProducts;
};