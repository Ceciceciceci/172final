var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true
  },
  // reference to the user who created this post
  post: 
        {type: Schema.Types.ObjectId,
         ref: 'post',
         required:true
        }

});

module.exports = mongoose.model('category', PostSchema);
