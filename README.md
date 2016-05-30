## mongoose-field-remover

This plugin is perfect to hide sensitive data from your schemas, like a password-like field. Also, by default, it hides the self-generated mongoose's field `__v` and renames `_id` into just `id` when, in a fetched document, is called the `.toJSON()` method.

# Usage

`$ npm install mongoose-field-remover`

Then you can add the plugin on your schemas

```javascript
var fieldRemover = require('mongoose-field-remover');

var UserSchema = new Schema({
  name : String,
  password: String,
  hideMeToo: String
});

// Specify the fields you want to hide
// using a string, each field separated
// by a space
//                                  -vvvvvvvvvv-
UserSchema.plugin(fieldRemover, 'password hideMeToo');
//                                  -^^^^^^^^^^-
var User = mongoose.model('User', UserSchema);

User.find({}, function (err, docs) {
  console.log(docs.toJSON());
  /**
    [{
      "id": "507f1f77bcf86cd799439011",
      "name": "Joao"
    }]
  */
});

```

You may also specify the fields to hide directly when calling `.toJSON()`. For example:
```javascript
User.find({}, function (err, docs) {
  console.log(docs.toJSON({ hide: 'password' }));
  /**
    [{
      "id": "507f1f77bcf86cd799439011",
      "name": "Joao",
      "hideMeToo": "NotHiding"
    }]
  */
});
```

**NOTE**: Passing the object in `.toJSON()` will overwrite the fields passed on the `Schema.plugin()` call.

# Issues

If you would like to submit a pull request with any changes you make, please feel free!
