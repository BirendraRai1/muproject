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
    		//console.log(JSON.stringify(data.data[0][0]['Heading']));
    		// for(var i=0; i<9; i++) {var ty = data.data[0][i]['Heading']; console.log(ty+'this');}
        /*  $('#scrollingChat').append('<div class="owl-carousel owl-theme"> <div class="carousel-item"> <div class="card" style=""> <img class="card-img-top" src="https://dal.objectstorage.open.softlayer.com/v1/AUTH_825fa5c8cc274e1a8b6240fd72393990/meta_images/poli.jpg" alt="Card image cap" style="width:100%; height:auto; max-height:150px;"> <div class="card-block"> <p class="card-title" style="font-size:12pt; line-height: 1"><b>Journalist Arrested For Extortion Update: Vinod Verma Says He Has Sex CD Of Minister</b></p><p class="card-text" style="font-size:11pt; line-height: 1.2">Chhattisgarh police yesterday arrested ex-BBC Hindi journalist Vinod Verma, who is now associated with Congresss media cell. The police slapped charges of extortion on him. Verma has however denied the allegations and claimed he has a “sex CD” of state PWD Minister Rajesh Munat which he will release soon.</p> </div></div></div><div class="carousel-item"> <div class="carousel-item-image"> <img src="https://f.i.uol.com.br/fotografia/2016/03/11/594616-970x600-1.jpeg" class="item-image"> </div><div class="carousel-item-text"> <span class="item-kicker">Restaurante de São Paulo</span> <h3 class="item-title">Tordesilhas</h3> </div> </div><div class="carousel-item"><div class="carousel-item-image"> <img src="https://f.i.uol.com.br/fotografia/2016/03/11/594617-970x600-1.jpeg" class="item-image"> </div><div class="carousel-item-text"> <span class="item-kicker">Restaurante que você já foi</span> <h3 class="item-title">Bar do Luiz Fernandes</h3> </div> </div><div class="carousel-item">  <div class="carousel-item-image"> <img src="https://f.i.uol.com.br/fotografia/2016/03/11/594619-970x600-1.jpeg" class="item-image"> </div><div class="carousel-item-text"> <span class="item-kicker">Para ir a dois</span> <h3 class="item-title">A Figueira Rubaiyat</h3> </div> </div><div class="carousel-item">  <div class="carousel-item-image"> <img src="https://f.i.uol.com.br/fotografia/2016/03/11/594618-970x600-1.jpeg" class="item-image"> </div><div class="carousel-item-text"> <span class="item-kicker">Coxinha</span> <h3 class="item-title">Ragazzo</h3> </div> </div><div class="carousel-item">  <div class="carousel-item-image"> <img src="https://f.i.uol.com.br/fotografia/2016/03/11/594615-970x600-1.jpeg" class="item-image"> </div><div class="carousel-item-text"> <span class="item-kicker">Cafeteria</span> <h3 class="item-title">Starbucks</h3> </div> </div></div>'); */
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
    //console.log(JSON.stringify(data.data[0][rousel-0]['urlimg']));
    abc();
  }
});



    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application

    // Send request
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
  /*function messageDisplay(){
    $('#chatting').append('<div class="dialogue-answer" style=" min-height: 58px; padding: 4px;border-radius: 2px;"><div class="profil-picture" style="width: 50px;height: 50px;float: left;position: relative;   margin: 0 5px 0 0;background: #fff;overflow: hidden;"><img src="public/img/bot_2.png" alt="default" style="position: absolute;max-width: 48px;max-height: 48px;margin: auto;border-radius: 0;"></div><span style="color: #333;font-weight: 700;">Meta</span><div> hey, I am good thanks!  How are you?</div></div><button type="button" class="btn btn-secondary" style="border-radius: 16px;margin-left: 54px;cursor: default;padding: 10px;background-color: #362e40;color: white;border: none;text-decoration: none;display: inline-block;">READ IN META</button>');
    abc();
  }*/
}());
