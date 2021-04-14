/*
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/chatdb1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // other options 
});


mongoose.connection.once('open', function(){
    console.log('Connection succesfull');
}).on('error', function(error){
    console.log('Connection error...', error);
});

console.log('db connection');
*/
/*


*/

var mysql = require('mysql')

global.globalPool = mysql.createPool({
  connectionLimit: 20,
  host: "localhost",
  user: "user",
  password: "user",
  database: "forum"
});