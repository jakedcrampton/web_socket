var express = require('express');
var app = express();
var server = require('http').createServer(app);
var sanitizeHtml = require('sanitize-html');

// Routing
app.use(express.static(__dirname + '/public'));

var io = require('socket.io')(server);
io.on('connection', function(socket) {

    socket.on('message', function(data) {
        var dirtyMessage = data.message;
        var dirtyColor = data.color;
        var dirtyName = data.name;

        console.log(data);

        // we tell the client to execute 'message'
        socket.broadcast.emit('message', {
            message: sanitizeHtml(dirtyMessage),
            color: sanitizeHtml(dirtyColor),
            name: sanitizeHtml(dirtyName)
        });
    });
});

server.listen(3000);
