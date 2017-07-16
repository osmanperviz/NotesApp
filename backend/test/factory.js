import factory from 'factory-girl';
import User from '../models/user';
import Notes from '../models/notes'
import faker from 'faker';
//import bluebird from 'bluebird'


factory.define('user', User, {
  username: () => faker.internet.userName(),
  password: () => faker.internet.password(),
});

factory.define('note', Notes, {
  title: () => faker.lorem.word(),
  _creator: factory.assoc('user', 'id'),
});

export default factory;
