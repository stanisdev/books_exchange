/**
 * Book model
 */
module.exports = (mongoose) => {

  const bookSchema = new mongoose.Schema({
    _user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, "Title length too short"],
      maxlength: [200, "Title length too long"]
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Author length too short"],
      maxlength: [200, "Author length too long"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description length too long"]
    }
  });

  mongoose.model('Book', bookSchema);
};
