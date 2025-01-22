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
.controller('MainPageController', function ($location, $scope) {
      var $ctrl = this;

      $ctrl.showComponent = '';
      console.log("1."+$ctrl.showComponent); // Default component

      $ctrl.setActiveComponent = function (component) {
        $ctrl.showComponent = component;
        
        console.log('2'+$ctrl.showComponent+component); // Selected component
        
      };

      $ctrl.logout = function () {
        alert('Logged out successfully!');
      };
});
