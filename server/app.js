const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const routes = require('./routers/users')

const app = express()

app.use(express.json())
if (process.env.NODE_ENV !== "test") app.use(logger('dev'))
app.use(cors())

app.use('/users', routes)

app.get('/', (req, res) => {
  res.send({
    message: "welcome",
    description: "LEARNING API",
    endpoints: [
      "GET    /                       200",
      "GET    /users                  200",
      "GET    /users/:id              200",
      "POST   /users                  201",
      "PATCH  /users/:id              200",
      "DELETE /users/:id              204",
    ]
  })
})

app.post('/', (req, res) => {
  res.status(405).send('Not allowed!')
});

module.exports = app
