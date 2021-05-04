var app = angular.module('ShoppingListCheckOff', [ ]);

app.factory('ShoppingListCheckOffService', function(){

    var model = [{
                        name: 'cookies',
                        quantity: 10,
                        needToBuy: true
                    },{
                        name: 'milk',
                        quantity: 2,
                        needToBuy: true
                    },
                    {
                        name: 'apricot',
                        quantity: 20,
                        needToBuy: true
                    },
                    {
                        name: 'pepper',
                        quantity: 4,
                        needToBuy: true
                    },
                    {
                        name: 'orange juice',
                        quantity: 1,
                        needToBuy: true
                    }];

    return {
        getShopList: function (type) {
          if (type == 'buy') {
            return model.filter(x => x.needToBuy);
          }
          return model.filter(x => !x.needToBuy);
        },

        updateShopList: function (name) {
                model.find(x => x.name == name).needToBuy = false;
        },

        checkStatus: function (type) {
      
          return this.getShopList(type).length == 0;
        },
  };
})

app.controller('ToBuyController', 
    function ToBuyController($scope, ShoppingListCheckOffService){

        $scope.checkStatus = function() {
           return ShoppingListCheckOffService.checkStatus('buy');
        };

        $scope.Buy = function(name) {
          ShoppingListCheckOffService.updateShopList(name);
         
        };

        $scope.getShopList = function() {
          return ShoppingListCheckOffService.getShopList('buy');
        };
    }
)

app.controller('AlreadyBoughtController', 
    function AlreadyBoughtController($scope, ShoppingListCheckOffService){
     
        $scope.getShopList = function() {
          return ShoppingListCheckOffService.getShopList('bought');
        };

        $scope.checkStatus = function() {
          return ShoppingListCheckOffService.checkStatus('bought');
        };
    }
)