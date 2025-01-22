var app = angular.module('CricInfo', ['ngRoute', 'mainpage', 'schedulepage']);

app.config(function ($routeProvider,$locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });  
  $routeProvider
    .when('/login', {
      templateUrl: 'components/login/login.html',
      controller: 'LoginController',
    })
    .when('/register', {
      templateUrl: 'components/register/register.html',
      controller: 'RegisterController',
    })
    .when('/main',{
        templateUrl: 'components/mainpage/mainpage.html',
        controller: 'MainPageController as $ctrl',
    })
    // .when('/main/schedule',{
    //   templateUrl: 'components/schedule/schedule.html',
    //   // controller: 'ScheduleController',
    //   template: '<schedule></schedule>',
    // })
    .otherwise({
      redirectTo: '/login',
    });
    
});

app.directive('matchPassword', function() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=matchPassword'
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.matchPassword = function(modelValue) {
          return modelValue === scope.otherModelValue;
        };
  
        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    };
});

  
