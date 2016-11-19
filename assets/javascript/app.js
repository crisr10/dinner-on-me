var breakfast = {
    meal: 'Breakfast',
    options: ['Pancakes','Eggs','Omelet','American','Brunch','Creperies','Waffles'],
    index: 0
};
var lunch = {
    meal: 'Lunch',
    options:['Mexican','Indian','Greek','Vietnamese','Chinese','Sushi','Sandwiches','Light & Healthy','Vegan','Wraps','Cafes','Delis',
    'Hot dogs','Salad','Vegetarian'],
    index: 1
};
var dinner = {
    meal: 'Dinner',
    options:['Mexican','Indian','Greek','Vietnamese','Chinese','Sushi','American','Asain Fusion','Barbeque','Buffets','Burgers','Chicken',
    'Cuban','Dim sum','Diners','Fast food','French','Hawaiian','Italian','Japanese','Kosher','Noodles & Ramen','Pizza','Southern',
    'Seafood','Thai','Teppanyaki','Tapas','Tacos','Steakhouses'],
    index: 2
};
var dessert = {
    meal:'Dessert',
    options:['Cheesecake','Pie','Flan','Ice cream','Cookies','Crepes','Bakery','Specialty','Pastries','Scones','Macarons','Cupcakes','Shaved ice'],
    index:3
}

// Array containing the objects above
var meals = [breakfast,lunch,dinner,dessert];

// Array for meal price
var price = [5 , 10 , 15 ];

//Empty var to store users preferences
var mealChosen = '';
var mealType = '';
var priceChoice = '';
var instructions = '';
var zip = '';
var latitude = '';
var longitude = '';
var map = "";

$(document).ready(function(){


    // Click function for meal buttons
    $('#start').on('click',function(){
        // Create the buttons for the meal options
        mealButtons();

    }); // End Submit on click 

});

    function emptyButtonsView() {
        $('#buttonsView').empty();
    }
    // Functons that creates the meal buttons
    function mealButtons() {
        emptyButtonsView();
        instructions = $('<h3 class="instructions"> Please select what type of meal would you like </h3>')
        $('#buttonsView').append(instructions);
        for (var i = 0; i < meals.length; i++) {
            var $mealButtons = $('<button>');
            $mealButtons.text(meals[i].meal);
            $mealButtons.attr('class','meal btn btn-success hvr-bounce-to-right');
            $mealButtons.attr('data-meal',meals[i].meal);
            $mealButtons.attr('data-index',meals[i].index);
            $mealButtons.attr('options',meals[i].options);
            $mealButtons.appendTo('#buttonsView');
        }
        // Click function to pick meals (breakfast,lunch,dinner,dessert)
        $('.meal').on('click',function(){

            // Store meal chosen to global variable
            mealChosen = $(this).data('meal');
            console.log(mealChosen)

            // Grabs the index number inside the meals array
            var indexMeals = $(this).data('index');

            emptyButtonsView();

                optionsButtons(indexMeals);
        });
    }

    // Function that creates the meal options buttons
    function optionsButtons(indexMeals) {
        instructions = $('<h3 class="instructions"> Now Select a category </h3>')
        $('#buttonsView').append(instructions);
        var indexOptions =meals[indexMeals].options
        for (var j = 0; j < indexOptions.length; j++) {
            var $optionsButtons = $('<button>');
            $optionsButtons.text(indexOptions[j]);
            $optionsButtons.attr('class','options btn btn-danger hvr-bounce-to-right');
            $optionsButtons.data('mealOption', indexOptions[j]);
            $optionsButtons.appendTo('#buttonsView');
        }
        // Click function for meal 
        $('.options').on('click',function() {
            mealType = ($(this).data('mealOption')).toLowerCase();
            emptyButtonsView();
            priceButtons();
        });
    }

    // Function that creates the price buttons
    function priceButtons () {
        instructions = $('<h3 class="instructions"> How far are you willing to drive?</h3>')
        $('#buttonsView').append(instructions);
        for (var m = 0; m < price.length; m++) {
            var $moneyButtons = $('<button>');
            $moneyButtons.text(price[m]);
            $moneyButtons.attr('class', 'price btn btn-primary hvr-bounce-to-right');
            $moneyButtons.data('price',price[m]);
            $moneyButtons.appendTo('#buttonsView');
        }

        $('.price').on('click',function(){
            priceChosen = $(this).data('price');
            emptyButtonsView();
            enterLocation();
        })
    }

    function enterLocation() {
        var $location = $('<div class="group-form"></div>');
        $location.append('<label class="control-label" for="focusedInput">Enter Your City or Zip Code</label>');
        $location.append('<input class="form-control" id="focusedInput" placeholder="City or Zip Here">');
        $location.append('<a class="input-group-btn"><button href="results.html" class="btn btn-default submit" type="button">Submit</button></span>');
        $('#buttonsView').append($location);

        $('.submit').on('click',function(){
            zip = ($('#focusedInput').val().trim()).toLowerCase();
            emptyButtonsView();
            var $container = $('<div>');
            $container.attr('class','container');
            $container.append('<div class="row blueBackground"></div>')
            $('#buttonsView').append($container);
            yelp();
        });
    }



function yelp() {
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
                    consumerKey : "RpOfNfVyFi9ERNlGhsFL_A",
                    consumerSecret : "hPXdyUr2c_wL-LtdCvSyVZbrwek",
                    accessToken : "XEzpFfia9NnKwYT7V0lE3pMLjhJdqGJe",
                    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                    // You wouldn't actually want to expose your access token secret like this in a real application.
                    accessTokenSecret : "dqCha2MGUIUJFmWkhNkPZTIcj0M",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                    }
                };

                var accessor = {
                    consumerSecret : auth.consumerSecret,
                    tokenSecret : auth.accessTokenSecret
                };
                console.log(mealType);
                console.log(zip);
                console.log(priceChosen);

                var parameters = [];
                parameters.push(['term', 'food']);
                parameters.push(['category_filter', mealType.replace(/ +/g, "")]);
                // parameters.push(['radius_filter', 10]);
                parameters.push(['location', zip]);
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
                        var $result = '<div class="col-sm-5 restaurantInfo"></div><div class="col-sm-5" id="map"></div>'
                        $('.row ').append($result);
                        var restaurants = jqXHR.responseJSON;
                        var randomNumber = Math.floor(Math.random()*(restaurants.businesses.length));
                        console.log(randomNumber);
                        console.log(restaurants);
                        longitude = restaurants.businesses[randomNumber].location.coordinate.longitude;
                        latitude = restaurants.businesses[randomNumber].location.coordinate.latitude;
                        console.log(longitude);
                        var phone = restaurants.businesses[randomNumber].phone;
                        var image = restaurants.businesses[randomNumber].image_url;
                        var name = restaurants.businesses[randomNumber].name;
                        var ratingImage =restaurants.businesses[randomNumber].rating_img_url;
                        var snippet =restaurants.businesses[randomNumber].snippet_text;

                        $('.restaurantInfo').append('<h3 class="weRecommend">Dinner on Me brings you!</h3>');
                        $('.restaurantInfo').append('<h3 class="name">'+name+'</h3>');
                        $('.restaurantInfo').append('<div class="snippet">Review highlight: ' +snippet+ '</div>');
                        $('.restaurantInfo').append('<img src="'+ratingImage+'"class="ratingimage">' );
                        $('.restaurantInfo').append('<img src="'+image+'" class="image"> ');
                        $('#map').append('here goes the map');

                        initMap();
                            // Here is the aoo that makes the map appear on the screen
                               function initMap() {
                            var bestChoice = {lat: latitude, lng: longitude};
                            var map = new google.maps.Map(document.getElementById('map'), {
                              zoom: 10,
                              center: bestChoice
                            });
                            var marker = new google.maps.Marker({
                              position: bestChoice,
                              map: map
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

                })

                .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                });
            }



