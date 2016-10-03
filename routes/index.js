let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let config = require('../config/app-config.js')
let Generic = require('../helper/function.js')
let router = express.Router()

router.use(bodyParser.urlencoded({extended:true}))

router.get('/', function(req,res,next){
  Generic.timeline(function(result_timeline){
    res.render('index.ejs', {timeline: result_timeline, data: null})
  })
})

router.post('/', function(req,res,next){
  Generic.timeline(function(result_timeline){
    let timeline = result_timeline
    Generic.search(req.body.q,function(result_search){
      let search = result_search
      res.render('index.ejs', {timeline: timeline, data: search})
    })
  })
})

router.post('/tweet', function(req,res,next){
  Generic.postTweet(req.body.tweetbaru,function(post_update){
    res.json(post_update)
  })
})

router.post('/api/tweet', function(req,res,next){
  console.log(req.query.tweetbaru);
  Generic.postTweet(req.query.tweetbaru,function(post_update){
    console.log("query===", req.query.tweetbaru)
    res.json(post_update)
  })
})

router.get('/api/timeline', function(req,res,next){
  Generic.timeline(function(result_timeline){
    res.json(result_timeline)
  })
})

router.post('/api/search', function(req,res,next){
  Generic.search(req.body.q,function(result_search){
    let search = result_search
    res.json(result_search)
  })
})

// router.post('/api/tweet', function(req,res,next){
//   Generic.postTweet(req.body.tweetbaru,function(post_update){
//     res.redirect('/')
//   })
// })

module.exports = router
