(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignupService', 'MenuService'];
function SignUpController(SignupService, MenuService) {
  var signup = this;
  signup.item = {
  	firstname: "",
  	lastname: "",
  	email: "",
  	phone: "",
  	shortname: "",
  	title: "",
  	description: ""
  };
   
   signup.completed = false;
   signup.unKnownDish = false;

 	signup.go = function () {
    console.log(signup.item.firstname);
    signup.item.shortname = signup.item.shortname.toUpperCase();

    MenuService.getMenuItem(signup.item.shortname).then(
      function (response) {
        if (response.name) {
          signup.item.title = response.name;
          signup.item.description = response.description;

          SignupService.saveForm(signup.item);
          signup.unKnownDish = false;
          signup.completed = true;


        } else {
          signup.completed = false;
          signup.unKnownDish = true;
        }
        
      });
  };

}

})();
