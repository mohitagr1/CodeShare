const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
})

io.on('connection', socket => {
    console.log('connnection');
  socket.on('code', (data) => {
    console.log(data);
    socket.broadcast.emit('code', data)
  })
})

http.listen(4000, function() {
  console.log('listening on port 4000')
})