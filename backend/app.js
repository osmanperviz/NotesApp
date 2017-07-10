import express from 'express';
import db from '../db';
import config from './config/config'
import routes from '../routes'
import middlewares from './middlewares'
import passport from './config/passport'

// import APIError from './helpers/apiError'

const app = express();

db.connect(config.database)

app.use(middlewares())
app.use(passport.initialize())

//passportConfig(passport) // pass passsport for configuration


app.use('/api', routes);

export default app;
