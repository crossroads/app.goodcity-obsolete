App.Item = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

App.Item.FIXTURES = [
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
];
