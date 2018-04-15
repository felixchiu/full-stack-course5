(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);


SignupService.$inject = ['ApiPath'];
function SignupService(ApiPath) {
  var service = this;
  service.item = {};

  service.saveForm = function (item) {
     service.item = item;
  };

  service.getForm = function () {
    return service.item;
  }
}

})();
