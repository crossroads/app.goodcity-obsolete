FactoryGuy.define('item_type', {
  sequences: {
    name: function(num) {
      return 'Category' + num;
    },
    code: function(num) {
      return num;
    }
  },
  default: {
    name:            FactoryGuy.generate("name"),
    code:            FactoryGuy.generate("code")
  }
});

export default {};
