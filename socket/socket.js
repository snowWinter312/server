var http = require('http');

module.exports = {
    connect : function(io, PORT){
        io.on('connection', (socket) => {
            console.log('user connection on port ' + PORT + ' : ' + socket.id)

            socket.on('message', (message)=>{
                console.log(message)
                var post_data = "from_id=" + message.from_id + "&to_id=" + message.to_id + "&msg=" + message.msg
                
                var post_options = {
                    hostname: 'localhost',
                    port: 3000,
                    path: '/api/v1/chat/send',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(post_data)
                    }
                };

                var post_req = http.request(post_options, function(res) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        console.log('Response: ' + chunk);

                        io.emit('message', chunk)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        })
    }
}