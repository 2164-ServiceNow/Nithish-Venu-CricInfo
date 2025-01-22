// angular.module('mainpage', [])

// .component('mainpage',{ // components named CANNOT include '-' or '.'
//     templateUrl: 'components/mainpage/mainpage.html',
//     // controller: function navbarCtrl(){
        
//     // },
//     controller: function ($location) {
//         this.showComponent = function (component) {
//             console.log(component);
//             // Navigate to the selected component
//             $location.path('/main/' + component);
//         };

//         this.logout = function () {
//             // Add logout logic here
//             alert('Logged out successfully!');
//         };
//     }

// })
// angular.module('mainpage', [])
//   .component('mainpage', {
//     templateUrl: 'components/mainpage/mainpage.html',
//     controller: function () {
//       var $ctrl = this;

//       $ctrl.showComponent = 'schedule'; // Default component

//       $ctrl.setActiveComponent = function (component) {
//         $ctrl.showComponent = component;
//       };

//       $ctrl.logout = function () {
//         alert('Logged out successfully!');
//       };
//     },
//   });

angular.module('mainpage', [])
  .controller('MainPageController', function ($scope,$timeout) {
    var $ctrl = this;

    // Default component
    $ctrl.showComponent = 'schedule';
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

    // Logout functionality
    $ctrl.logout = function () {
      alert('Logged out successfully!');
    };
  });
