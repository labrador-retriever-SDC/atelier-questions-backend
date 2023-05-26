import { DataTypes} from 'sequelize'
import sequelize from '../db/database';

const questions = sequelize.define('questions', {
  'id': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'product_id': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'body': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'date_written': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'asker_name': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'asker_email': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'reported': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'helpful': {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export default questions;