const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html')
})

// let clients = []

io.on('connection', (socket) => {
  const id = socket.id

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })

  // notify clients a new client has joined
  // clients.push(id)
  socket.broadcast.emit("welcome", id)

  // notify other clients a new one has disconnected
  socket.on('disconnect', () => {
    io.emit("farewell", id)
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})

app.get('/favicon.ico', (_, res) => res.status(204))
