import DS from 'ember-data';
import Addressable from './addressable';

var attr = DS.attr;

export default Addressable.extend({
  name:   attr('string'),
  mobile: attr('string')
});
