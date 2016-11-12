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
  
 var meals = ['Breakfast','Lunch','Dinner','Dessert'];

var Breakfast = {
	options:['Pancakes','Eggs','Omelet'],
	price: ['$','$$','$$$']
};
var Lunch = {
	options:['Mexican','Indian','Greek','Vietnamese','Chinese','Sushi'],
	price: ['$','$$','$$$']
};
var Dinner = {
	options:['Mexican','Indian','Greek','Vietnamese','Chinese','Sushi'],
	price: ['$','$$','$$$']
};
var Dessert = {
	optiosn:['Cheesecake','Pie','Flan'],
	price:['$','$$','$$$']
}

var mealChosen = '';

function buttonsViewEmpty () {
	$('#buttonsView').empty();
}

	$('#submit').on('click',function(){
		$('#buttonsView').empty();
		mealButtons();
		$('.meal').on('click',function(){
			mealChosen = $(this).data('meal');

			if (mealChosen === 'Breakfast') {
				console.log('I Chose breakfast');

			} else if (mealChosen === 'Lunch') {
				console.log ('I Chose Lunch')
			} else if (mealChosen === 'Dinner') {
				console.log('I chose Dinner');
			} else {
				console.log('I want some dessrt');
			}
		});
	})

	function mealButtons() {
		for (var i = 0; i < meals.length; i++) {
			var $mealButtons = $('<button>');
			$mealButtons.text(meals[i]);
			$mealButtons.attr('class','meal btn btn-success')
			$mealButtons.attr('data-meal',meals[i]);
			$mealButtons.appendTo('#buttonsView');
		}
	}