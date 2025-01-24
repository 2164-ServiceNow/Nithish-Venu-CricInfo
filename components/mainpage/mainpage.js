


angular.module('mainpage', [])
  .controller('MainPageController', function ($scope,AuthService,$timeout,$location) {
    var $ctrl = this;
   

    // Default component
    $ctrl.showComponent = 'home';
    console.log("Initial Component: " + $ctrl.showComponent);

    // Method to set active component
    $ctrl.setActiveComponent = function (component) {
      console.log("Changing to component: " + component);

      $timeout(function () {
        $ctrl.showComponent = component;
        $scope.$apply(); // Update the active component
        console.log("Updated Component: " + $ctrl.showComponent);
      });
    };
    $ctrl.isDropdownVisible = true;
    $ctrl.toggleDropdown = function () {
      $ctrl.isDropdownVisible = !$ctrl.isDropdownVisible;
    };


    // Logout functionality
    $ctrl.logout = function () {
      AuthService.logout();
      $location.path("/login");
      alert('Logged out successfully!');
    };
  });
