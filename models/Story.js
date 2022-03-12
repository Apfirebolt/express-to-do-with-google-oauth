const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const StorySchema = new Schema({
  title:{
    type:String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  date:{
    type: Date,
    default: Date.now
  }
});

// Create collection and add schema
mongoose.model('stories', StorySchema, 'stories');