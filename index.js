const express = require('express')
const cors = require('cors')
require('./db/mongoose')
require('dotenv').config()
const app = express()
const server = require('http').createServer(app);
const Messages = require('./models/messages')


const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const entrepreneurRouter = require('./routers/entrepreneur')
const investorRouter = require('./routers/investor')
const pitchRouter = require('./routers/pitches')
const userRouter = require('./routers/user')
const chatEngineRouter = require('./routers/chatengine')


const port = process.env.PORT

app.use(express.json())
app.use(entrepreneurRouter)
app.use(investorRouter)
app.use(pitchRouter)
app.use(userRouter)
app.use(chatEngineRouter)

app.use(
  cors({
    origin: '*',
  }),
)


io.on("connection", (socket) => {

  socket.on('userAdded', (msg) => {
    console.log('added a user with id:', msg);
  })

  socket.on("sendMessage", (payload) => {
    // console.log(payload);
    // const sendPayload = { senderId: payload.senderId, content: payload.text }
    const message = new Messages({ conversationId: payload.conversationId, senderId: payload.senderId, receiverId: payload.receiverId, content: payload.content })
    message.save();
    io.emit(payload.receiverId, payload)
  })

  socket.on("check_typing", ({ room, istyping }) => {
    io.emit("check_typing" + room)
  });

});


app.get('/', (req, res) => {
  res.send({ msg: 'Hey congratulations, we are connected' })
})

server.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + port)
})
