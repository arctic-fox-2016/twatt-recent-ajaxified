console.log("HELLO")

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  xhttp.open("GET","", true)
  xhttp.send()
};

var xhr = new XMLHttpRequest();
xhr.onload = function (e) {
  var results = document.getElementById('results')
  results.innerHTML = e.target.response
};
xhr.open('GET', 'http://localhost:4000/api/timeline', true);
xhr.responseType = 'json';
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
xhr.send();
