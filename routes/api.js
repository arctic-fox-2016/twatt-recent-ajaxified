var express = require('express')
var router = express.Router()
var OAuth = require('oauth')
var http = require('http')
//var auth = require('./models/auth')
var Twitter = require('twitter')
var client = new Twitter({
  consumer_key: "TWBI2C2gO18JAN9NjUsHtqEse",
  consumer_secret: "fmkk87g8hYrnMN1odHFdbO31lFlUt9kNGLyrZ8BjhdKkXVswKu",
  access_token_key: "69251620-qw3N3dHKFXtWZ2qbY8thCBE0iyXNL2vtvqoTyYUtf",
  access_token_secret: "jjxweAjAU0jBIXBs5OBF1jpJS0co2wqFeaBHhhzNtJupT"
});

var myoauth = new OAuth.OAuth(
	"https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "TWBI2C2gO18JAN9NjUsHtqEse",
  "fmkk87g8hYrnMN1odHFdbO31lFlUt9kNGLyrZ8BjhdKkXVswKu",
  '1.0A',
  null,
  'HMAC-SHA1'
)

router.get('/', function(req, res, next) {
	myoauth.get(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=digachandra`,
    "69251620-qw3N3dHKFXtWZ2qbY8thCBE0iyXNL2vtvqoTyYUtf",
    "jjxweAjAU0jBIXBs5OBF1jpJS0co2wqFeaBHhhzNtJupT",
    function(e, data, rs){
      if(e){
        console.error(e)
      } else {
        var result_json = JSON.parse(data)
        var result = {}
        result["profile"] = result_json[0].user
        result["tweet"] = result_json
				res.json(result)
      }
    }
  )
})

router.post('/', function(req, res, next){
	client.post('statuses/update', {status: req.body.tweet},  function(error, tweet, response) {
	  if(error) throw error;
		res.redirect('/')
	});
})

module.exports = router;
