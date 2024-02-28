const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const clients = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    // Send existing text to the new user
    io.to(socket.id).emit('updateText', clients);
  
    socket.on('updateText', (text) => {
      clients[socket.id] = text;
      io.emit('updateText', clients);
    });
  
    socket.on('resetText', () => {
      // Reset the text for all clients
      for (const clientId in clients) {
        clients[clientId] = '';
      }
      io.emit('updateText', clients);
    });
  
    socket.on('disconnect', () => {
      delete clients[socket.id];
      io.emit('updateText', clients);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
