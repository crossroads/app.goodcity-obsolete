FactoryGuy.define('message', {
  default: {
    offer: FactoryGuy.belongsTo("offer"),
    item: FactoryGuy.belongsTo("item"),
    sender: FactoryGuy.belongsTo("user"),
    state: 'unread',
    isPrivate: false,
    body: "Message Example Test"
  }
});

export default {};
