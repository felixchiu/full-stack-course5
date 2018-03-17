(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.name = "";
  $scope.message = "";

  $scope.checklunch = function () {
  	if ($scope.name === "") {
  		$scope.message = "Please enter data first!";
  	} else {
  	var itemArray = convertToArray($scope.name);
  	console.log(itemArray);
  	var itemArrayCount = itemArray.length;
  	console.log(itemArrayCount);
  	if (itemArrayCount > 3) {
  		$scope.message = "Too much!";
  	}
  	else if (itemArrayCount > 0 && itemArrayCount < 4 ) {
  		$scope.message = "Enjoy!";
  	}
  }
  };

}

  function convertToArray(inputString) {
  	return inputString.split(",");
  }


})();