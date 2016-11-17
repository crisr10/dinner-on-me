// These are all the opjects of meals, and their options for types of foods 
var breakfast = {
    meal: 'Breakfast',
    options: ['Pancakes','Eggs','Omelet'],
    index: 0
};
var lunch = {
    meal: 'Lunch',
    options:['Mexican','Indian','Greek','Vietnamese','Chinese','Sushi'],
    index: 1
};
var dinner = {
    meal: 'Dinner',
    options:['Mexican','Indian','Greek','Vietnamese','Chinese','Sushi'],
    index: 2
};
var dessert = {
    meal:'Dessert',
    options:['Cheesecake','Pie','Flan'],
    index:3
}

// Array containing the objects above
var meals = [breakfast,lunch,dinner,dessert];

// Array for meal price
var price = ['$','$$','$$$'];

//Empty var to store users preferences
var mealChosen = '';
var mealType = '';
var priceChoice = '';
var instructions = '';
var city; 

// App starts 
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
            $optionsButtons.attr('class','options btn btn-danger');
            $optionsButtons.data('mealOption', indexOptions[j]);
            $optionsButtons.appendTo('#buttonsView');
        }
        // Click function for meal 
        $('.options').on('click',function() {
            mealType = ($(this).data('mealOption'));
            emptyButtonsView();
            priceButtons();
        });
    }

    // Function that creates the price buttons
    function priceButtons () {
        instructions = $('<h3 class="instructions"> Now Select the price </h3>')
        $('#buttonsView').append(instructions);
        for (var m = 0; m < price.length; m++) {
            var $moneyButtons = $('<button>');
            $moneyButtons.text(price[m]);
            $moneyButtons.attr('class', 'price btn btn-primary hvr-fade');
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
        $location.append('<label class="control-label" for="focusedInput">Enter Your City</label><br/>');
        $location.append('<input class="form-control" id="focusedInput" placeholder="Enter City Here"><br/>');

        $location.append('<a href="results.html" class="btn btn-default">Default</a>');
        $('#buttonsView').append($location);

        $('.submit').on('click',function(){
            city = ($('#focusedInput').val().trim()).toLowerCase();
            emptyButtonsView();
        });
    }

var client_id = "B_-KZ4g7hB8mWD4bYryGfQ";
var client_secret = "3EWUeqMCrsBwKLGL3PzYkjXZGG8b3ncehBoPM2vNJgTtio5FPFH7GTQbeEe2R5oX";
var tokenRetrivalEndpoint = 'http://api.yelp.com/oauth2/token';
var tokenRetrivalOptions = {
    grant_type: 'client_credentials',
    client_id: client_id,
    client_secret: client_secret
};

var search;


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
        
                var terms = 'food';
                var near =  search;
        
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


