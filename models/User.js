const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  googleID:{
    type:String,
    required: false
  },
  githubId: {
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type:String
  }
});

// Create collection and add schema
mongoose.model('users', UserSchema);