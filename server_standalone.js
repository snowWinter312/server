var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
const io = require('socket.io')(http)
const sockets = require('./socket/socket')
const server = require('./socket/listen') 

const PORT = 3000 // Socket Port

// Mysql DB CONNECTION
require('./config/db_config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/www'))

// Avoid CROS
app.all('/*' ,function(req, res, next) {
    res.append("Access-Control-Allow-Origin", ['*']);
    res.append("Access-Control-Allow-Credentials", true);
    res.append("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type');
    res.append("Access-Control-Allow-Methods", "GET, POST","PUT");
    next();
})

// API Route
var main = require('./route/router')
app.use('/api/v1', main)

sockets.connect(io, PORT)
server.listen(http, PORT)