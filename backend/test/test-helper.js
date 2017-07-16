import mongoose from 'mongoose';

module.export = function() {
  before((done) => {
    mongoose.connect('mongodb://localhost/test', done);
  });

  after((done) => {
   mongoose.connection.db.dropDatabase(done);
  });
}
