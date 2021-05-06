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
    var service = this;
    service.found = [];
    service.nothing = false;

    service.getMatchedMenuItems = function() {
      service.found = [];
      if(service.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(service.searchTerm);
        promise.then(function(response) {
          service.found = response;
          service.nothing = false;
        });
      } else {
        service.nothing = true;
      }
    };

    service.removeItem = function (index) {
      service.found.splice(index, 1);
      if(service.found.length == 0) {
         service.nothing = true;
      }
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
