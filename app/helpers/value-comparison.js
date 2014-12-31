// {{#value-compariosn imageIds.length ">" 1}}
//   <button {{action "setFavouriteImage" previewImageId}}>Favourite</button>
// {{/value-compariosn}}
import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(v1, options) {

  var value1, value2, operator;

  if (arguments.length === 4) {
    value1 = arguments[0];
    operator = arguments[1];
    value2 = path = arguments[2];
    options = arguments[3];
    // options.hash.keyword = keywordName;
    // if (path === '') { path = 'this'; }
  }

  return options.fn(this);

  // v1 = this.get(v1);
  // v2 = this.get(v2);

  // switch (operator) {
  //   case '===':
  //     return (v1 === v2) ? options.fn(this) : options.inverse(this);
  //   case '<':
  //     return (v1 < v2) ? options.fn(this) : options.inverse(this);
  //   case '<=':
  //     return (v1 <= v2) ? options.fn(this) : options.inverse(this);
  //   case '>':
  //     return (v1 > v2) ? options.fn(this) : options.inverse(this);
  //   case '>=':
  //     return (v1 >= v2) ? options.fn(this) : options.inverse(this);
  //   case '&&':
  //     return (v1 && v2) ? options.fn(this) : options.inverse(this);
  //   case '||':
  //     return (v1 || v2) ? options.fn(this) : options.inverse(this);
  //   default:
  //     return options.inverse(this);
  //   }
});
