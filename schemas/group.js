var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name : String,
    type : Number,              // 0 : Group, 1 : Sub-Group
    parent_group_id : String
}); 
  
module.exports = mongoose.model('Group', groupSchema);