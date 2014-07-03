import Ember from 'ember';
import ItemType from "../models/item_type";

export default Ember.Route.extend({

  model: function() {
    return this.store.find('item_type');
  }
});
