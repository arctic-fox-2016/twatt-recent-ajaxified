

let getLatestTimeline = function(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/api/timeline', true )
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.responseType = 'json'
  xhr.send()

  xhr.onload = function(e){
    timeline = document.getElementById('timeline')
    timeline.innerHTML = ""
    let data = e.target.response
    for (let i in data){
      timeline.innerHTML = timeline.innerHTML + "<li>" + data[i].user.name + ": " + data[i].text + "<br>"
    }
  }
}

let postTweet = function(){
  let xhr = new XMLHttpRequest();
  tweet = document.getElementById('tweet').value
  xhr.open('POST', `http://localhost:3000/api/tweet?tweetbaru=${tweet}`, false)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send()
  document.getElementById('tweet').value = ""
  getLatestTimeline()
}
