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
    search.nothing = false;

    search.getMatchedMenuItems = function() {
      search.found = [];
      if(search.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);
        promise.then(function(response) {
            console.log(search.found);
          search.found = response;
          search.nothing = false;
        })
        .catch(function(err) {
          console.error(err);
          search.nothing = true;
        });
      } else {
        search.nothing = true;
      }
    };

    search.removeItem = function (index) {
      search.found.splice(index, 1);
      if(search.found.length == 0) {
        search.error = "Nothing found!";
         search.nothing = true;
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
        console.log(result.data.menu_items.filter(x => x.description.indexOf(searchTerm) > -1));
        return result.data.menu_items.filter(x => x.description.indexOf(searchTerm) > -1);
      });
    }
  };
})();
