var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var channelSchema = new Schema({
    name : String,
    group_id : String,
}); 
  
module.exports = mongoose.model('Channel', channelSchema);