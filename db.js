const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/notes-app");
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Error in server.js--mongoose connection → ${err.message}`);
});

module.exports = mongoose;
