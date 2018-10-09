const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.Server(app);
const io = socketIO(server);
var fs = require('fs');

app.use(express.static(path.resolve(__dirname, 'public')));

let clicks = 0;
let userlength = 0;

io.on('connect', function(socket){
  userlength++;
  socket.on('click', function(){
    console.log('Clicked');
    io.emit('clickChanged', ++clicks);
    io.emit('users', userlength);
  });

  //Disconnect event
  socket.on('disconnect',function () {
    console.log('Disconnected!');
  });

});

io.on('disconnect', (socket) => {
  userlength--;
  console.log(userlength);
})


server.listen(3000, () => {
	console.log('listening on *:3000');
});
