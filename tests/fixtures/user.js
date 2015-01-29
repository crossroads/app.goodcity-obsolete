FactoryGuy.define('user', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
    collectionFirstName: function(num) {
      return 'Daniel' + num;
    },
    collectionLastName: function(num) {
      return 'Stepp' + num;
    }
  },
  default: {
    id:        FactoryGuy.generate('id'),
    firstName: FactoryGuy.generate('collectionFirstName'),
    lastName:  FactoryGuy.generate('collectionLastName')
  },
  user_with_image: {
    image: FactoryGuy.belongsTo('image')
  }
});
export default {};
