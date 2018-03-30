(function(){
	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				found: '<',
				onRemove: '&'
			}			
		};
		return ddo;
	}
	NarrowItDownController.$inject= ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;
		ctrl.keyword = "";
		ctrl.narrowItDown = function() {
			if (ctrl.keyword === "") {
					ctrl.found = [];
			} else {
				MenuSearchService.getMatchedMenuItems(ctrl.keyword)
				.then( function(items) {
					ctrl.found=items;
				});
			}
		};
		ctrl.removeItem = function(index) {
			ctrl.found.splice(index, 1);
		};
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			var foundItems = [];
    		searchTerm = searchTerm.trim().toLowerCase();

    		return $http({
      			method: "GET",
    			url: (ApiBasePath + "/menu_items.json")
    		})
    		.then( function (result) {
    			for (var i=0; i<result.data.menu_items.length; i++) {
    				if ((result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1)) {
    					foundItems.push( result.data.menu_items[i]);
    				}
    			}
    			return foundItems;
    		})
    		.catch(function (error) {
      			console.log("Error while retrieving the data.");
    		});
		};
	}

})();