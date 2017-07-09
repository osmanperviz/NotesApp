import express from 'express';
import db from '../db';
// import routes from './routes'
import middlewares from './middlewares'
// import APIError from './helpers/apiError'
require('../db')

const app = express();

db.connect("mongodb://localhost:27017/notes-app")

app.use(middlewares())

// app.use('/api', routes);

export default app;
