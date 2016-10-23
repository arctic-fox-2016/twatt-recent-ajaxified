"use-strict"

let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let OAuth = require('oauth')
let http = require('http')
let port = process.env.PORT || 3000
let router = express.Router()
let expressLayouts = require('express-ejs-layouts')
let twitterAPI = require('node-twitter-api');
let morgan = require('morgan')
let cors = require('cors')
let twitter = new twitterAPI({
    consumerKey: 'PUVrm0PcRGICBYJkx2Vgn2UqI',
    consumerSecret: 'PBOIc4GWc8SA6wd836Iwt4xbpjvVUVWVAG0ldXTRKQQf00mVMF'
});

app.use(cors())
app.use(morgan())
app.use(express.static(__dirname + '/public'))
app.use(expressLayouts)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.listen(port)

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'PUVrm0PcRGICBYJkx2Vgn2UqI',
    'PBOIc4GWc8SA6wd836Iwt4xbpjvVUVWVAG0ldXTRKQQf00mVMF',
    '1.0A',
    null,
    'HMAC-SHA1'
)
app.get('/tweet', function (req, res) {
    oauth.get(
        `https://api.twitter.com/1.1/statuses/user_timeline.json?count=10`,
        '780647183234195456-MuN7SDrLFjxZcVMR0xGnAjGl5qiBDPw', //test user token
        'An6V8gmmFmOJ8vhWsCFflz1lBPqlRTcFtrXgu34bCuTZl', //test user secret
        function (e, data, resj) {
            if (e) {
                console.error(e)
            } else {
                var result = JSON.parse(data)
                res.json(result)
            }
        })
})
app.get('/', function (req, res) {
    res.render('index')
})

app.post('/search', function (req, res, next) {
    oauth.get(
        `https://api.twitter.com/1.1/search/tweets.json?count=50&q=${req.body.search}`,
        '780647183234195456-MuN7SDrLFjxZcVMR0xGnAjGl5qiBDPw', //test user token
        'An6V8gmmFmOJ8vhWsCFflz1lBPqlRTcFtrXgu34bCuTZl', //test user secret
        function (e, data, resj) {
            if (e) {
                console.error(e)
            } else {
                var result = JSON.parse(data)
                res.render('search', {
                    word_searched: result
                })
            }
        })
})

app.post('/tweet', function (req, res, next) {
    twitter.statuses("update", {
            status: req.body.text
        },
        '780647183234195456-MuN7SDrLFjxZcVMR0xGnAjGl5qiBDPw',
        'An6V8gmmFmOJ8vhWsCFflz1lBPqlRTcFtrXgu34bCuTZl',
        function (error, data, response) {
            if (error) {
                res.json(error)
            } else {
                res.json(data)
            }
        }
    );
})
