// https://github.com/stefanpenner/ember-cli/issues/808
// http://stackoverflow.com/questions/13830290/how-do-i-pass-a-variable-to-a-handlebars-helper

export default function(v1, operator, v2, options) {
  v1 = this.get(v1);

  switch (operator) {
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
    }
}

// {{#value-compariosn imageIds.length ">" 1}}
//   <button {{action "setFavouriteImage" previewImageId}}>Favourite</button>
// {{/value-compariosn}}
