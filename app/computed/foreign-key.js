import Ember from 'ember';

export default Ember.computed.foreignKey = function(path) {
  var relationshipName = path.split('.')[0];
  return Ember.computed(function(key, value) {
    //get
    if (arguments.length === 1) {
      return this.get(path);
    }

    //set
    var type = this.get(relationshipName + ".constructor.typeKey");
    var model = this.store.getById(type, value);
    if (!model) {
      return this.get(path);
    }
    this.set(relationshipName, model);
    return value;
  }).property(relationshipName);
};
