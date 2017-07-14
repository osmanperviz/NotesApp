import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

mockgoose(mongoose);

module.exports.createDB = (cb) => {
  mongoose.connect('mongodb://localhost/test', cb);
};

module.exports.destroyDB = () => {
  mongoose.disconnect();
};
