import { Sequelize } from 'sequelize';
import 'dotenv/config';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const conn = new Sequelize(dbName, dbUser, dbPass, {
	host: dbHost,
	dialect: 'mysql',
	port: dbPort,
});

try {
	await conn.authenticate();
	console.log('Connection has been established successfully.');
} catch (err) {
	console.log('Unable to connect to the database:', err);
}

export default conn;
