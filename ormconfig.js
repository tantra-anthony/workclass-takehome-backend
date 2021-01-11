require('dotenv').config();

const appRoot = require('app-root-path');
const path = require('path');
const migrationFolderPath = 'migrations';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(appRoot.path, "src", "**", "*.entity{.ts,.js}")],
  migrationsTableName: "migrations",
  migrations: [path.join(migrationFolderPath, '*{.ts,.js}')],
  ssl: {
    rejectUnauthorized: false,
  },
  cli: {
    migrationsDir: migrationFolderPath,
  },
}
