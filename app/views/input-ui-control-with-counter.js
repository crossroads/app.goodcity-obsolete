import Ember from 'ember';

export default Ember.View.extend({
  layout: Ember.Handlebars.compile('<div class="input_container">{{yield}}<span {{bindAttr class="view.isMaxCharLengthReached :char-count :right"}}>{{view.message}}</span>{{view.label}}</div>'),

  template: function () {
    switch (this.get('type')) {
      case 'textarea':
        return Ember.Handlebars.compile('{{view Ember.TextArea viewName="inputControl" valueBinding="view.value" placeholderBinding="view.placeholder" maxlengthBinding="view.maxlength" rowsBinding="view.rows"}}');
      default:
        return Ember.Handlebars.compile('{{view Ember.TextField viewName="inputControl" valueBinding="view.value" placeholderBinding="view.placeholder" maxlengthBinding="view.maxlength"}}');
    }
  }.property(),

  /* dataType: {String} ['textarea']
   * type  -> (description: Type of Input Field, by default - its a text input
   *           To use it with a textara, specify type as 'textarea')
   * value -> (description: Current value of the input field)
   * label -> (description: Label associated with 'INPUT' field), (method: required)
   * placeholder -> (description: Placeholder string of 'Input' field), (method: optional)
   * maxlength -> (description: HTML5 MaxLength attribute of 'Input' field), (method: required)
   * rows -> (description: Rows needed for the Textarea and optional for the textbox), (method: optional)
   * message -> (description: character count message e.g. (130/190)), (method: private)
   */
  type: null,
  // dataType: {String|Number}
  value: null,
  // dataType: {String}
  label: null,
  // dataType: {String}
  placeholder: null,
  // dataType: {String}
  maxlength: null,
  // dataType: {number}
  rows: null,
  // dataType:{String}
  message: null,

  currentCountBinding: 'inputControl.value.length',

  charactersKeyedIn: function () {
    var special_chars = this.get('inputControl.value').match(/(\r\n|\n|\r)/g);
    var total_count = 0;
    total_count = special_chars != null ? (special_chars.length  + this.get('currentCount')) : this.get('currentCount');
    return total_count;
  }.property('currentCount'),

  isMaxCharLengthReached: Ember.computed.equal('charactersKeyedIn', 'maxlength'),

  keyUp: function () {
    var char_counter_message = this.get('charactersKeyedIn') + '/' + this.get('maxlength');
    this.set('message', char_counter_message );
  },

  didInsertElement: function () {
    if (!this.get('maxlength')) {
      Ember.assert('InputWithCounter doesn\'t work without a maxlength attribute');
    }
  }
});
