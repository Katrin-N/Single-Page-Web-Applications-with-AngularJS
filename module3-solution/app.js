var app = angular.module('NarrowItDownApp', [ ]);

app.factory('MenuSearchService', ['$rootScope', '$http', function ($rootScope, $http){

    return {
        getMatchedMenuItems: function (searchTerm) {
          
            return $http({method: 'GET', url: 'https://davids-restaurant.herokuapp.com/menu_items.json'}).
                then(function (result) {
                
                var foundItems = result.data.menu_items.filter(x => x.description.indexOf(searchTerm) > -1);

                 console.log(foundItems);
                return foundItems;
            });
        }
  };
}])

app.controller('NarrowItDownController', 
    function NarrowItDownController($scope, MenuSearchService){
         $scope.searchTerm = "";
         $scope.foundItems = [];
         $scope.name = "ffff";

         $scope.searchItems = function() {
             $scope.foundItems = [];
             $scope.foundItems = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
        };
    }
)


app.directive("foundItems", function($timeout) {
    return {
      restrict: 'EAC',
      template: `<div>Directive Counter: {{internalCount}}</div>`,
      link: function($scope, element) {
        $scope.internalCount = 0;
        function addCount() {
          $timeout(function() {
            $scope.internalCount += 1;
            addCount();
          }, 1000)
        }
        addCount();
      }
    };
  }
);