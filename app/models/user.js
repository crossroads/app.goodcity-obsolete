import DS from 'ember-data';
import UserPermission from './user_permission';

var attr = DS.attr;

export default DS.Model.extend(UserPermission, {
  firstName:   attr('string'),
  lastName:    attr('string')
});
