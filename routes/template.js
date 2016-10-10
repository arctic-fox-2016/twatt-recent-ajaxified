var express = require('express')
var router = express.Router()
var OAuth = require('oauth')
var http = require('http')
    //var auth = require('./models/auth')
var Twitter = require('twitter')
var client = new Twitter({
    consumer_key: "skmU4bFjEOquk3PTIARqqA0ar",
    consumer_secret: "SsY7VWHZ9hBMBXqzxjEsXzlB2gHOv5DvIdSZmALVvej4Co53QA",
    access_token_key: "154606959-uWvssleXi2eMsKXoFS0Z0Rg3GSILEVpbdDb9ucmh",
    access_token_secret: "iEwx1kUPOR1BLdNVwz3jjq1FIIJ8UxAUF1EJQufccIPUy"
});

var myoauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "skmU4bFjEOquk3PTIARqqA0ar",
    "SsY7VWHZ9hBMBXqzxjEsXzlB2gHOv5DvIdSZmALVvej4Co53QA",
    '1.0A',
    null,
    'HMAC-SHA1'
)

router.get('/', function(req, res, next) {
    myoauth.get(
        `https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=vanzgerard`,
        "154606959-uWvssleXi2eMsKXoFS0Z0Rg3GSILEVpbdDb9ucmh",
        "iEwx1kUPOR1BLdNVwz3jjq1FIIJ8UxAUF1EJQufccIPUy",
        function(e, data, rs) {
            if (e) {
                console.error(e)
            } else {
                let result = JSON.parse(data)
                    //res.json(result[0].user)
                res.render('template/body', {
                    title: 'Twatt App',
                    profile: result[0].user,
                    tweet: result
                })
            }
        }
    )
})

router.post('/', function(req, res, next) {
    client.post('statuses/update', {
        status: req.body.tweet
    }, function(error, tweet, response) {
        if (error) throw error;
        res.redirect('/')
    });
})

module.exports = router;
