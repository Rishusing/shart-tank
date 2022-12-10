const express = require('express')
const cors = require('cors')
require('./db/mongoose')
require('dotenv').config()

const entrepreneurRouter = require('./routers/entrepreneur')
const investorRouter = require('./routers/investor')
const pitchRouter = require('./routers/pitches')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(entrepreneurRouter)
app.use(investorRouter)
app.use(pitchRouter)

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.get('/', (req, res) => {
  res.send({ msg: 'Hey congratulations, we are connected' })
})

app.listen(8000, () => {
  console.log('Server is up on port ' + port)
})
