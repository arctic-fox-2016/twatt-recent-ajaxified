$(document).ready(function () {
    $("#btnsend").on('click', function (e) {
        e.preventDefault()
        send()
    })
    $.ajax({
        url: "/tweet",
        type: "GET",
        response: "json"
    }).done(function (result) {
        for (var i = 0; i < result.length; i++) {
            inserttobody(result[i])
        }

    })
})

function send() {

    $.ajax({
        url: "/tweet",
        type: "POST",
        data: {
            text: $("#tweeting").val()
        },
        response: "json"
    }).done(function (result) {
        inserttobody(result)
        $("#tweeting").val("")
    })
}

function inserttobody(tweet) {
    $("#tweetbody").prepend(
        `<br><div class='jumbotron'><p>< ${tweet.text} ></p> <p style='font-size: 10px'>< ${tweet.created_at}></p></div>`
    )
}
