import DS from 'ember-data';

var Item = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Item.reopenClass({
  FIXTURES: [
             {
               id: 1,
               title: 'Ember Item',
               isCompleted: true
             },
             {
               id: 2,
               title: 'My new Item',
               isCompleted: false
             },
             {
               id: 3,
               title: 'Handlebar Item',
               isCompleted: false
             }
            ]
});
export default Item;
