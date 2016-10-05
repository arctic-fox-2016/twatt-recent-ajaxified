var express = require('express');
var router = express.Router();
var http = require('http')
    //var oauth = require('oauth')
var twitConfig = require('../config.js')
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: twitConfig.consumerKey,
    consumer_secret: twitConfig.consumerSecret,
    access_token_key: twitConfig.accessToken,
    access_token_secret: twitConfig.accessTokenSecret
});

function connectOauth() {
    return new oauth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        twitConfig.consumerKey,
        twitConfig.consumerSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    )
}

/* GET home page. */
router.get('/', function(req, res, next) {
    client.get('statuses/user_timeline', {
        screen_name: 'liliwibiesono'
    }, function(error, tweets, response) {
        if (!error) {
            res.render('index', {
                title: 'Twatt!'
            })
        }
    });
});

router.get('/api/timeline', function(req, res, next) {
    client.get('statuses/user_timeline', {
        screen_name: 'liliwibiesono'
    }, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets)
            res.json(tweets)
        }
    });
});


router.post('/api/posttwatt', function(req, res, next) {
    client.post('statuses/update', {
        status: req.query.status
    }, function(error, tweet, response) {
        console.log(tweet); // Tweet body.
        res.json(tweet)
    });
})


module.exports = router;
