FactoryGuy.define('schedule',{
  sequences: {
    name: function(num) {
      return 'Daniel' + num;
    },
    slot: function(num) {
      return num;
    }
  },
  default: {
    resource:     FactoryGuy.generate('name'),
    slot:         FactoryGuy.generate('slot'),
    slotName:     'slot name',
    zone:         'zone',
    scheduledAt:  '12/01/2014'
  }
});
export default {};
