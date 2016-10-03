"use-strict"
let express = require('express')
let app = express()
let OAuth = require('oauth')
let http = require('http')
let index = require('./routes/index.js')
let router = express.Router()
let cors = require('cors')

app.set('port', process.env.PORT || 3000)
app.set('view-engine', 'ejs')

app.use(cors())
app.use('/', index)

app.listen(app.get('port'), function(){
  console.log('listening on port', app.get('port'))
})
