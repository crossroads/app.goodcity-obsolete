import { test, moduleFor } from 'ember-qunit';

moduleFor('item-type', 'ItemTypeComponent', {
});

test('it renders', function() {
  var component;
  expect(2);
  component = this.subject();
  equal(component.state, 'preRender');
  this.append();
  return equal(component.state, 'inDOM');
});
