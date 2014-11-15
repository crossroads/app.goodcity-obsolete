FactoryGuy.define('contact',{
  sequences: {
    name: function(num) {
      return 'Daniel' + num;
    },
  },
  default: {
    name: FactoryGuy.generate('name')
  }
});
export default {};
