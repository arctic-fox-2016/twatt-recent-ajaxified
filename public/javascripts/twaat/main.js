function twaatProcessAjax(ajax, callback) {
    var _ajax_contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    var _ajax_processData = true

    $.ajax({
        contentType: _ajax_contentType,
        processData: _ajax_processData,
        url: ajax["url"],
        type: ajax["method"],
        data: ajax["data"],
        dataType: "json",
        success: function(result) {
            callback(result)
        }
    });
}

function twaatGetTweet() {
    var _p_resulttweet = $("div#result-tweet")
    twaatProcessAjax({
        "url": "http://localhost:3000/api",
        "method": "GET",
        "data": null
    }, function(result) {
        _p_resulttweet.empty()
        _.forEach(result.tweet, function(value) {
            var html = `<div class="panel panel-default"><div class="panel-body"><p>${value.text}</p></div></div>`;

            _p_resulttweet.append(html)
                //_p_resulttweet.find("div:last-child").css({"opacity":0}).animate({"opacity":1}, 500)
        });
        setTimeout(function() {
            twaatGetTweet()
        }, 5000)
    })
}

function twattGetProfile() {
    twaatProcessAjax({
        "url": "http://localhost:3000/api",
        "method": "GET",
        "data": null
    }, function(result) {
        $("img#profile-logo").attr("src", result.profile.profile_image_url.replace("_normal", ""))
        $("#profile-name").text(result.profile.name)
        twaatGetTweet()
    })
}

function twattPostTweet() {
    $("#form-tweet").unbind().on("submit", function(event) {
        event.preventDefault()
        twaatProcessAjax({
            "url": "http://localhost:3000/api",
            "method": "POST",
            "data": $("#form-tweet").serialize()
        }, function(result) {
            twaatGetTweet()
        })
    })
}

$(function() {
    twattGetProfile()
    twattPostTweet()
})
