// server.js

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// serve static files
app.use(express.static(__dirname + '/public'));

// handle socket.io connections
io.on('connection', function(socket) {
  console.log('A user connected');

  // send camera stream to client
  socket.on('stream', function(image) {
    socket.broadcast.emit('stream', image);
  });

  // handle disconnections
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

// start server
http.listen(3000, function() {
  console.log('Server started on port 3000');
});
