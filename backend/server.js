const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

const users = [];

io.on('connection', socket => {
  console.log('connnection');

  socket.on('join', ({ userName, roomId }) => {
    // console.log('someone Joined', userName, roomId);
    const user = {
      id: socket.id,
      name: userName,
      room: roomId
    }
    // if (users.length < 1) {
    //   users = [];
    //   users.push(user);
    // }
    // else {
    users.push(user);
    // }
    socket.join(user.room);

    socket.broadcast.to(user.room).emit('participants', { users: users });
    socket.emit('participants', { users: users });

    socket.on('code', (data) => {
      // console.log(data, user);
      socket.broadcast.to(user.room).emit('code', data.code)
    })

  });



})

http.listen(4000, function () {
  console.log('listening on port 4000')
})