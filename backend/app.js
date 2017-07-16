import express from 'express';
import db from '../db';
import config from './config/config'
import routes from '../routes'
import middlewares from './middlewares'


const app = express();

db.createConnection(config.database)

app.use(middlewares())

app.use('/api', routes);

export default app;
