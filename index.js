import app from './backend/app';

let env  = process.env.NODE_ENV;

let port;
if(env !== 'test') {
  port = process.env.PORT || 4000;
}

app.listen(port, () => console.log(`Listening on port ${port}`));
