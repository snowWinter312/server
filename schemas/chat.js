var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    from_id    : String,
    to_id      : String,
    message    : String,
    send_at    : String
}); 

module.exports = mongoose.model('Chat', chatSchema);