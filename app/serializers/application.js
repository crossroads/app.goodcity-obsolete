import Ember from 'ember';
import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({});


// server uses underscored root objects like blog_posts
// export default DS.RESTSerializer.extend({
//   typeForRoot: function(root) {
//     var camelized = Ember.String.camelize(root);
//     return Ember.String.singularize(camelized);
//   }
// });
