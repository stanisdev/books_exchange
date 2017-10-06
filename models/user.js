const randomString = require('randomstring');

/**
 * User model
 */
module.exports = (mongoose) => {

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name length too short"],
      maxlength: [30, "Name length too long"]
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        isAsync: true,
        validator: function(value, callback) {
          mongoose.model("User").findOne({
            email: value
          }).then(data => {
            if (data instanceof Object) {
              return callback(false, "Email already exists");
            }
            callback();
          }).catch(callback);
        }
      },
    },
    enabled: {
      type: Boolean,
      default: false
    },
    activation_code: {
      type: String
    },
    created_at: {
      type: Date,
    }
  });

   mongoose.model('User', userSchema);
};
