import { DataTypes} from 'sequelize'
import sequelize from '../db/database.js';

const products = sequelize.define('products', {
  'id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  'name': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'slogan': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'description': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'category': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'default_price': {
    type: DataTypes.NUMBER,
    allowNull: false
  }
})

export default products;