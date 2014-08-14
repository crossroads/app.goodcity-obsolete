var conditions = ["New", "Lightly Used", "Heavily Used", "Broken"];

FactoryGuy.define('donor_condition', {
  default: {
    name: conditions[Math.floor(Math.random()*conditions.length)]
  }
});

export default {};
