import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

// Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'goodcity', // TODO: loaded via config
  Resolver: Resolver,
  PUSHER_OPTS: { key: GoodcityENV.APP.PUSHER_API_KEY, connection: {}, logAllEvents: true }
});

loadInitializers(App, 'goodcity');

export default App;
