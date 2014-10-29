import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('item-type', 'ItemTypeComponent', {
});

test('it renders select2', function() {
  var component;
  expect(1);
  component = this.subject();
  equal(component.state, 'preRender');
  return;
});
