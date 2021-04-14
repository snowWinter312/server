var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    email : String,
    password : String,
    role : Number,
    group_id : String,
    channel_id : String,
    avator_url : String
}); 
  
module.exports = mongoose.model('User', userSchema);