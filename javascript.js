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
var price = '';

// App starts 
$(document).ready(function(){

	// Click function for meal buttons
	$('#submit').on('click',function(){

		// Create the buttons for the meal options
		mealButtons();

	}); // End Submit on click 

}); // App ends

	// Deletes everything on $('#buttonsView') in the HTML 
	function emptyButtonsView () {
		$('#buttonsView').empty();
	}

	// Functons that creates the meal buttons
	function mealButtons() {
		emptyButtonsView();

		// 
		for (var i = 0; i < meals.length; i++) {
			var $mealButtons = $('<button>');
			$mealButtons.text(meals[i].meal);
			$mealButtons.attr('class','meal btn btn-success');
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

			optionsButtons(indexMeals);

		});
	}

	// Funstion that creates the meal options buttons
	function optionsButtons(indexMeals) {
		emptyButtonsView();
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
			priceButtons();

		});
	}

	// Function that creates the price buttons
	function priceButtons () {
		emptyButtonsView();
		for (var money=0; money<price.length; money++) {
			var $moneyButtons = $('<buttons>');
			$moneyButtons.text(price[money]);
			$moneyButtons.attr('class', 'price btn btn-primary');
			$moneyButtons.data('price',price[money]);
			$moneyButtons.appendTo('#buttonsView');
		}

		$('.price').on('click',function(){
			price = $(this).data('price');
		})
	}



