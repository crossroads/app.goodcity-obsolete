import User from './user';
import DS from 'ember-data';

export default User.extend({
  messages: DS.hasMany('message')
});
