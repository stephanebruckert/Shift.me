'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap', 'angularMoment'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
	var today = new Date();
	today.setHours(0,0,0,0);

	var firstDay = new Date(today);
	firstDay.setDate(today.getDate()-4);
	$scope.dates = [];

	for (var i = 0; i < 10; i++) {
		var tomorrow = new Date(firstDay);
		tomorrow.setDate(firstDay.getDate()+i);
		$scope.dates.push({date:tomorrow,i:i,icon:"question"});
	}

	var cursor;
	$scope.changeColor = function(day) {
		cursor = day.i - 4;
		for(var i = 0; i < 4; i++) {
			$scope.dates[(day.i + i) % 10].icon = "home";
		}
		for(; i < 6; i++) {
			$scope.dates[(day.i + i) % 10].icon = "morning";
		}
		for(; i < 8; i++) {
			$scope.dates[(day.i + i) % 10].icon = "afternoon";
		}
		for(; i < 10; i++) {
			$scope.dates[(day.i + i) % 10].icon = "night";
		}
		$scope.$broadcast('refreshDatepickers');
	};
  
	var oneDay = 24*60*60*1000;

	$scope.getDayClass = function(date, mode) {
		if (mode === 'day') {
			var dayToCheck = new Date(date);
			dayToCheck.setHours(0,0,0,0);
			today.setHours(0,0,0,0);
			if (dayToCheck.getTime() >= today.getTime()) {
				var diffDays = Math.round((dayToCheck.getTime() - today.getTime())/(oneDay));
				switch((diffDays + 10 - cursor) % 10) {
					case 0:
					case 1:
					case 2:
					case 3:
						return 'home-circle';
					case 4:
					case 5:
						return 'morning-circle';
					case 6:
					case 7:
						return 'afternoon-circle';
					case 8:
					case 9:
						return 'night-circle';
					default:
						return '';
				} 
			}
		}
	};

}]);