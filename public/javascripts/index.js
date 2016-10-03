function submitTweet() {
    var data = document.getElementById("newtweet").value
        // console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:4000/api/posttwatt?status=${data}`);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send()
    loadData()
}

function loadData() {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:4000/api/timeline', true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();

    xhr.onload = function(e) { // e = event / emmiter / data
        var results = document.getElementById('results')
        var listOfTweets = e.target.response
        var myHtml = '<h3> My Timeline </h3>';
        for (var i = 0; i < listOfTweets.length; i++) {
            myHtml += "<p>" + listOfTweets[i].text + "</p>"
        }
        results.innerHTML = myHtml
    };

}

loadData()
