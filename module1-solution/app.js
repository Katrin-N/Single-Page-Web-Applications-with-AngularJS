
var app = angular.module('LunchCheck', [ ])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.resultText = "";
  $scope.class_name = "";

  $scope.checkRules = function() {
  	if ($scope.lunchMenu === '') {
  		$scope.resultText = 'Please enter data first';
  		$scope.class_name = "red";
  	}
  	else {
  		const wordsCount = $scope.lunchMenu.split(',').filter(x => x.trim().length > 0).length;
  		$scope.class_name = "green";
       	if (wordsCount <= 3) {
       		$scope.resultText = 'Enjoy!';
       	}
       	else {
       		$scope.resultText = 'Too much!';
       	}
  	}
  };
  
}


 