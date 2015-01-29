FactoryGuy.define('user', {
  sequences: {
    collectionFirstName: function(num) {
      return 'Daniel' + num;
    },
    collectionLastName: function(num) {
      return 'Stepp' + num;
    }
  },
  default: {
    firstName: FactoryGuy.generate('collectionFirstName'),
    lastName: FactoryGuy.generate('collectionLastName')
  },
  user_with_image: {
    image: FactoryGuy.belongsTo('image')
  }
});
export default {};
