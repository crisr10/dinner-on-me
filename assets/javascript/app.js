// var config = {
//     apiKey: "AIzaSyAn00ikrENl5il1EdZOUueJQLY_CqLPhWQ",
//     authDomain: "dinner-on-me.firebaseapp.com",
//     databaseURL: "https://dinner-on-me.firebaseio.com",
//     storageBucket: "dinner-on-me.appspot.com",
//     messagingSenderId: "310258061148"
//   };
//   firebase.initializeApp(config);

//   var database = firebase.database();

//   var key = AIzaSyCnaUowCn8tSao1lV56ztYhaIKG_TdH2TU

//   var map;
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -34.397, lng: 150.644},
//           zoom: 8
//         });
//       }

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
                    console.log("cb: " + JSON.stringify(data));
            }
            
                var auth = {
                    //
                    // Update with your auth tokens.
                    //
                    consumerKey : "",
                    consumerSecret : client_secret,
                    accessToken : "",
                    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                    // You wouldn't actually want to expose your access token secret like this in a real application.
                    accessTokenSecret : "",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                    }
                };
        
                var terms = 'food';
                var near = 'San+Francisco';
        
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

