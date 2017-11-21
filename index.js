const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static(path.resolve(__dirname, 'public')));

let clicks = 0;

io.on('connection', function(socket){
  socket.on('click', function(){
    console.log('Clicked');
    io.emit('clickChanged', ++clicks);
  });
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
