import express from 'express';
import 'dotenv/config';
import routes from './routes/index.js';
import conn from './db/db.js';
import errorHandler from './middlewares/errorHandler.js';

const apiPort = process.env.API_PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(errorHandler);

await conn.sync({ force: false }).then(() => {
	app.listen(apiPort, () => {
		console.log('server ok');
	});
});
