(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems);

  function foundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItem.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var search = this;
    search.found = [];
    search.startInit = true;
    search.getMatchedMenuItems = function() {
        search.startInit = false;
      if(search.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);
        promise.then(function(response) {
          search.found = response;
        });
      }
    };

    search.removeItem = function (index) {
      search.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
      }).then(function (result) {
        return result.data.menu_items.filter(x => x.description.indexOf(searchTerm) > -1);
      });
    }
  };
})();