import mongoose from 'mongoose';

 module.exports.createDB = (cb) => {
    mongoose.connect('mongodb://localhost/test', cb);
 };

 module.exports.destroyDB = () => {
   mongoose.connection.close()
   //mongoose.connection.db.dropDatabase();
 };
