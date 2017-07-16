import factory from 'factory-girl';
import User from '../models/user';
import Notes from '../models/notes'
import faker from 'faker';
//import bluebird from 'bluebird'


factory.define('user', User, {
  username: () => faker.internet.userName(),
  password: () => faker.internet.password(),
});

factory.define('notes', Notes,{

});

export default factory;
