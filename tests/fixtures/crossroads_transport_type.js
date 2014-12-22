var types = ["1/8 Truck", "2/8 Truck", "8/8 Truck"];

FactoryGuy.define('crossroads_transport_type', {
  default: {
    name: FactoryGuy.generate(function(num) {
      return types[Math.floor(Math.random()*(types.length))];
    })
  }
});

export default {};
