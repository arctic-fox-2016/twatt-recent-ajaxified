function getItems(){
  $.get({
    url:"http://localhost:3000/api/timeline",
    success:function(result){
      var list = $("p#results")
      list.empty()
      for(var idx=0;idx<result.length;idx++){
        var html = `<td>${result[idx].tweet}</td>`
        list.append(html)
      }
    }
  })
}

$(function(){
  getItems()
})
