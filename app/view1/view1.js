'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
	var today = new Date();
	$scope.dates = [];
	for (var i = 0; i < 10; i++) {
		var tomorrow = new Date(today);
		tomorrow.setDate(today.getDate()+i);
		$scope.dates.push({date:tomorrow,i:i,icon:"question"});
	}

	$scope.changeColor = function(day) {
		for(var i = 0; i < 4; i++) {
			$scope.dates[(day.i + i) % 10].icon = "home";
		}
		for(; i < 6; i++) {
			$scope.dates[(day.i + i) % 10].icon = "coffee";
		}
		for(; i < 8; i++) {
			$scope.dates[(day.i + i) % 10].icon = "sun-o";
		}
		for(; i < 10; i++) {
			$scope.dates[(day.i + i) % 10].icon = "moon-o";
		}
	};
}]);