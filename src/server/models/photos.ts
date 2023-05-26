import { DataTypes} from 'sequelize'
import sequelize from '../db/database.js';

const photos = sequelize.define('questions.photos', {
  'id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  'answer_id': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  'url': {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default photos;