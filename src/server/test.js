import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbPass = process.env.DB_PASS || '';
const dbHost = process.env.DB_HOST || '';
const dbPort = process.env.PORT || '';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'postgres',
});

// const Table = sequelize.define('Table', {}, {
//   tableName: 'tables',
//   schema: 'information_schema',
//   timestamps: false,
// });

sequelize.authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');

    // Query to get existing tables in a schema (PostgreSQL)
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;
    const [results] = await sequelize.query(query);

    // Extract the table names from the results
    const tableNames = results.map(result => result.table_name);

    // Log all table names
    console.log('Tables:');
    tableNames.forEach(tableName => {
      console.log(tableName);
    });

    // Close the database connection
    sequelize.close();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// const connectionTest = async () => {
//   try {
//     await db.authenticate();
//     console.log('Connected to database.')
//   } catch (error) {
//     console.log('Failed to connect to database', error)
//   }
// }
// connectionTest()

export default sequelize;