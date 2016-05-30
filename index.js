module.exports = function fieldRemover(schema, options) {

  if (!(typeof options === 'string' || options instanceof String))
    options = undefined;

  schema.set('toJSON', {
    transform(doc, ret, opts) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      if (!(typeof opts.hide === 'string' || opts.hide instanceof String))
        opts.hide = undefined;
      
      const fields = opts.hide || options;
      if (fields) {
        fields.split(' ').forEach(function(prop) {
          delete ret[prop];
        });
      }
    },
  });
};
