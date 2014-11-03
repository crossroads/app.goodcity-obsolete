import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'input-ui-control-with-counter',

  isTextArea: function(){
    return this.get('type') === 'textarea';
  }.property('type'),

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
  // dataType:{String}
  name: null,

  currentCountBinding: 'inputControl.value.length',

  charactersKeyedIn: function () {
    var control_val = this.get('inputControl.value');
    var total_count = 0, special_chars;
    special_chars = control_val ? control_val.match(/(\r\n|\n|\r)/g) : "";
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
