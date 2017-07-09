import  mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connection.on('error', (err) => {
  console.error(`Error in app.js--mongoose connection → ${err.message}`);
});

mongoose.connection.on('open', () => {
  console.log(`Mongoose connected at notes-app`);
});

mongoose.connection.on('close', () => {
  console.log('Mongoose connection closed');
});

export default mongoose;
