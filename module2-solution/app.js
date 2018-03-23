(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController (ShoppingListCheckOffService) {
  var buyCtrl = this;
  
  buyCtrl.buyList = ShoppingListCheckOffService.getBuyItems();

  buyCtrl.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

function AlreadyBoughtController (ShoppingListCheckOffService) {
  var boughtCtrl = this;

  boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var tobuyitems = [{ name: "cookies", quantity: 10 },
  { name: "drinks", quantity: 4 }, { name: "books", quantity: 3 },
  { name: "games", quantity: 12 }, { name: "pens", quantity: 8 }];
  var boughtitems = [];

  service.getBuyItems = function() {
    return tobuyitems;
  };
  service.getBoughtItems = function() {
    return boughtitems;
  };
  service.buyItem = function(index) {
    var item = tobuyitems[index];
    tobuyitems.splice(index,1);
    boughtitems.push(item);
  };
}

})();