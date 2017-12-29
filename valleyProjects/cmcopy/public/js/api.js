// The Api module is designed to handle all interactions with the server

var Api = (function() {
  var requestPayload;
  var responsePayload;
  var messageEndpoint = '/api/message';
    // Publicly accessible methods defined
    return {
      sendRequest: sendRequest,
      getNews: getNews,
      todaynews:todaynews,
      currentnews:currentnews,
      // The request/response getters/setters are defined here to prevent internal methods
      // from calling the methods without any of the callbacks that are added elsewhere.
      getRequestPayload: function() {
        return requestPayload;
      },
      setRequestPayload: function(newPayloadStr) {
        requestPayload = JSON.parse(newPayloadStr);
      },
      getResponsePayload: function() {
        return responsePayload;
      },
      setResponsePayload: function(newPayloadStr) {
        responsePayload = JSON.parse(newPayloadStr);
      }
    };

    // Send a message request to the server
    function sendRequest(text, context) {
      // Build request payload
      var payloadToWatson = {};
      if (text) {
        payloadToWatson.input = {
          text: text
        };
      }
      if (context) {
        payloadToWatson.context = context;
      }
      console.log("payloadToWatson ",payloadToWatson);
      // Built http request
      var http = new XMLHttpRequest();
      http.open('POST', messageEndpoint, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200 && http.responseText) {
          //console.log("http.responseText ",http.responseText);
          Api.setResponsePayload(http.responseText);
        }
      };

      var params = JSON.stringify(payloadToWatson);
      // Stored in variable (publicly visible through Api.getRequestPayload)
      // to be used throughout the application
      if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
        Api.setRequestPayload(params);
      }

      // Send request
      http.send(params);
    }

    function getNews(i)
    {
     //var div = document.getElementById('scrollingChat');
      /*
          var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://valleyai.mybluemix.net/catnews.php?cid=1', true);
      //xhr.withCredentials = true;
      xhr.send(null);
      xhr.onreadystatechange = function() {
              if (this.readyState == 4) {
            alert(xhr.responseText);
                  var Data = JSON.stringify(xhr.responseText);
            console.log(Data);
             }
           }; */
         $.ajax({
          url: 'https://valleyai.mybluemix.net/catnews.php?cid='+i,
          type: "GET",
          async: true,
          dataType:"JSON",
      //withCredentials: true,
      success: function(data) {
        console.log("success!");
        var print = '';   
        for(var i=0; i<=8; i++) {
          try{
            print = print + '<div class="carousel-item"><div class="card" style=""> <img class="card-img-top" src="'+data.data[0][i]['Image']+'" alt="Card image cap" style="width:100%; height:auto; max-height:150px;"> <div class="card-block"> <p class="card-title" style="font-size:12pt; line-height: 1"><b>'+data.data[0][i]['Heading']+'</b></p><p class="card-text" style="font-size:11pt; line-height: 1.2">'+data.data[0][i]['Content']+'</p><center><a href="'+data.data[0][i]['Url']+'"><img src="'+data.data[0][i]['imgurl']+'" width="40px" class="rounded-circle"/></a> &nbsp;&nbsp; <a href="'+data.data[0][i]['Url2']+'"><img src="'+data.data[0][i]['imgurl2']+'" width="40px" class="rounded-circle"/></a> &nbsp;&nbsp; <a href="'+data.data[0][i]['Url3']+'"><img src="'+data.data[0][i]['imgurl3']+'" width="40px" class="rounded-circle"/></a> </center> </div></div></div>' ;
          }
          catch(e){
            if(i<9)
              continue;
            else
              break;
          }
          
        }
        $('#scrollingChat').append('<div class="owl-carousel owl-theme">'+print+'</div>');
        abc();
      }
    });
   }
   function currentnews(){
    $.ajax({
      url:'https://valleyai.mybluemix.net/fnews.php?news=1',
      type:"GET",
      async:true,
      dataType:"JSON",
      success:function(data){
        console.log("success");
        var print ='';
        for(var i=0;i<3;i++){
          try{
            print=print + '<div class="carousel-item"><div class="card" style=""> <img class="card-img-top" src="'+data.data[0][i]['Image']+'" alt="Card image cap" style="width:100%; height:auto; max-height:150px;"> <div class="card-block"> <p class="card-title" style="font-size:12pt; line-height: 1"><b>'+data.data[0][i]['Heading']+'</b></p><p class="card-text" style="font-size:11pt; line-height: 1.2">'+data.data[0][i]['Excerpt']+'</p><center><a href="'+data.data[0][i]['category']+'"><img src="'+data.data[0][i]['Analysis']+'" width="40px" class="rounded-circle"/></a> &nbsp;&nbsp; <a href="'+data.data[0][i]['webView']+'"></a> &nbsp;&nbsp;</div></div></div>';
          }
          catch(e){
             if(i<3)
              continue;
            else
              break;
          }
        }
      }
    });
  }
   function todaynews(){
    $.ajax({
      url: 'https://valleyai.mybluemix.net/catnews.php?id=3',
      type:"GET",
      async:true,
      dataType:"JSON",
      success:function(data){
        console.log("success");
        var print ='';
        for(var i=0;i<=9;i++){
          print=print+'<div class="carousel-item"><div class="card" style=""> <img class="card-img-top" src="'+data.data[0][i]['Image']+'" alt="card image cap" style="width:100%;  height:auto; max-height:150px;"><div class="card-block"><p class="card-title" style="font-size:12pt; line-height:1"><b>'+data.data[0][i]['Heading']+'</b></p><p class="card-text" style="font-size:11pt; line-height: 1.2">'+data.data[0][i]['Content']+'</p><center><a href="'+data.data[0][i]['Url']+'"><img src="'+data.data[0][i]['imgurl']+'" width="40px" class="rounded-circle"/></a> &nbsp;&nbsp; <a href="'+data.data[0][i]['Url2']+'"><img src="'+data.data[0][i]['imgurl2']+'" width="40px" class="rounded-circle"/></a> &nbsp;&nbsp; <a href="'+data.data[0][i]['Url3']+'"><img src="'+data.data[0][i]['imgurl3']+'" width="40px" class="rounded-circle"/></a> </center> </div></div></div>' ;
        }
        $('#scrollingChat').append('<div class="owl-carousel owl-theme">'+print+'</div>');
        console.log(JSON.stringify(data.data[0][0]['urlimg']));
        abc();
      }
    });
  }
}());