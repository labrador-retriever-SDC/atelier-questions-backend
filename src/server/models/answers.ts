import { DataTypes} from 'sequelize'
import sequelize from '../db/database';

const answers = sequelize.define('answers', {
  'id': {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  'question_id': {
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
  'answerer_name': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'answerer_email': {
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

export default answers;