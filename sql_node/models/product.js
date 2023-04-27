const Sequealize = require("sequelize")


const sequelize = require("../util/database")



const Product = sequelize.define("product", {
  id: {
    type: Sequealize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequealize.STRING,
  price: {
    type : Sequealize.DOUBLE,
    allowNull : false,
  },
  imageUrl : {
    type: Sequealize.STRING,
    allowNull : false,
  },
  description : {
    type : Sequealize.STRING,
    allowNull : false
  },

})

module.exports = Product;