var objectAssign = require('object-assign');

module.exports = function fieldRemover(schema, options) {

  if (!(typeof options === 'string' || options instanceof String))
    options = undefined;

  var preObj = schema.get('toJSON') || {};
  var postObj = {
    transform: function(doc, ret, opts) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      if (!(typeof opts.hide === 'string' || opts.hide instanceof String))
        opts.hide = undefined;

      var fields = opts.hide || options;
      if (fields) {
        fields.split(' ').forEach(function(prop) {
          delete ret[prop];
        });
      }
    },
  };

  schema.set('toJSON', objectAssign(preObj, postObj));
};
