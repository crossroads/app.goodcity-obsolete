import DS from 'ember-data';
import UserPermissionMixin from '../mixins/user-permission';

var attr = DS.attr;

export default DS.Model.extend(UserPermissionMixin, {
  firstName:   attr('string'),
  lastName:    attr('string')
});
