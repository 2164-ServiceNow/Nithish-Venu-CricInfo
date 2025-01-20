var app = angular.module('CricInfo', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  // Enable HTML5 Mode (no hash in URL)
  $locationProvider.html5Mode({
    enabled: true,   // Enable HTML5 Mode
    requireBase: false // Disable base tag requirement
  });

  // Define the routes
  $routeProvider
    .when('/login', {
      templateUrl: 'components/login/login.html',
      controller: 'LoginController',
    })
    .when('/register', {
      templateUrl: 'components/register/register.html',
      controller: 'RegisterController',
    })
    .when('/home', {
      templateUrl: 'components/home/home.html',
      controller: 'HomeController',
    })
    .when('/schedule', {
      templateUrl: 'components/schedule/schedule.html',
      controller: 'CricketController',
    })
    .when('/live', {
      templateUrl:'components/live/live.html',
      controller: 'LiveMatchesController',
    })
    .otherwise({
      redirectTo: '/login',
    });
});

// Directive for matching passwords (for registration or password reset)
app.directive('matchPassword', function() {
  return {
    require: 'ngModel',
    scope: {
      otherModelValue: '=matchPassword'
    },
    link: function(scope, element, attributes, ngModel) {
      // Validator to check if passwords match
      ngModel.$validators.matchPassword = function(modelValue) {
        return modelValue === scope.otherModelValue;
      };

      // Watch for changes to the 'otherModelValue' and trigger validation
      scope.$watch('otherModelValue', function() {
        ngModel.$validate();
      });
    }
  };
});
