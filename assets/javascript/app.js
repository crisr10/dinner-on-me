  var map;
  var address;
  var latitude;
  var longitude;
  var infoWindow;
      function initMap() {
      	var infoWindow = new google.maps.InfoWindow({map: map});
      	console.log('google', infoWindow);
      	geoFindMe();
      	function geoFindMe() {
  var output = document.getElementById("buttonsView");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    api();

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

        map = new google.maps.Map(document.getElementById('buttonsView'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }

function api(){
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCnaUowCn8tSao1lV56ztYhaIKG_TdH2TU&callback'
$.ajax({url: url, method: 'GET'})
.done(function(response){
	console.log('hi this is  city',response);
	console.log(response.results[0].formatted_address)
	address = JSON.stringify(response.results[0].formatted_address)
	console.log('this is the address',address);
})
}




//yelp api down below
// C.R.U.D. (create, read, update, delete)

var client_id = "B_-KZ4g7hB8mWD4bYryGfQ";
var client_secret = "3EWUeqMCrsBwKLGL3PzYkjXZGG8b3ncehBoPM2vNJgTtio5FPFH7GTQbeEe2R5oX";
var tokenRetrivalEndpoint = 'http://api.yelp.com/oauth2/token';
var tokenRetrivalOptions = {
	grant_type: 'client_credentials',
	client_id: client_id,
	client_secret: client_secret
};


function cb(data) {        
                    // console.log("cb: " + JSON.stringify(data));
                    console.log("cb: " + JSON.stringify(data.businesses[0].location));
                    console.log("cb: " + JSON.stringify(data.businesses[0].rating));
                    console.log("cb: " + JSON.stringify(data.businesses.length));


            }
            
                var auth = {
                    //
                    // Update with your auth tokens.
                    //
                    consumerKey : "RpOfNfVyFi9ERNlGhsFL_A"
,
                    consumerSecret : "hPXdyUr2c_wL-LtdCvSyVZbrwek"
,
                    accessToken : "XEzpFfia9NnKwYT7V0lE3pMLjhJdqGJe",
                    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                    // You wouldn't actually want to expose your access token secret like this in a real application.
                    accessTokenSecret : "dqCha2MGUIUJFmWkhNkPZTIcj0M",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                    }
                };
        
                var terms = 'food';
                var near =  'san diego';
        
                var accessor = {
                    consumerSecret : auth.consumerSecret,
                    tokenSecret : auth.accessTokenSecret
                };

                var parameters = [];
                parameters.push(['term', terms]);
                parameters.push(['location', near]);
                parameters.push(['callback', 'cb']);
                parameters.push(['oauth_consumer_key', auth.consumerKey]);
                parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
                parameters.push(['oauth_token', auth.accessToken]);
                parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
        
                var message = {
                    'action' : 'https://api.yelp.com/v2/search',
                    'method' : 'GET',
                    'parameters' : parameters
                };
        
                OAuth.setTimestampAndNonce(message);
                OAuth.SignatureMethod.sign(message, accessor);
        
                var parameterMap = OAuth.getParameterMap(message.parameters);
                    
                $.ajax({
                    'url' : message.action,
                    'data' : parameterMap,
                    'dataType' : 'jsonp',
                    'jsonpCallback' : 'cb',
                    'cache': true
                })
                .done(function(data, textStatus, jqXHR) {
                        console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                    }
                )
                .fail(function(jqXHR, textStatus, errorThrown) {
                                    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                        }
                );



// var business = 'restaurant';
// var search = 'thai food';
// var url = 'https://api.yelp.com/v3/' + business + '/' + search;

// $.ajax({url: url, method: 'GET' })
//   .done(function(response){
//     debugger;
//     console.log(response);
//   })

