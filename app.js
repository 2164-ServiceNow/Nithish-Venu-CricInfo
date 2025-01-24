var app = angular.module('CricInfo', ['ngRoute', 'mainpage']);

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
app.service('AuthService', function($window) {
  this.login = function() {
    $window.localStorage.setItem('isAuthenticated', 'true');
  };

  this.logout = function() {
    $window.localStorage.removeItem('isAuthenticated');
  };

  this.isLoggedIn = function() {
    return $window.localStorage.getItem('isAuthenticated') === 'true';
  };
});


app.run(function($rootScope, $location, AuthService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    const restrictedRoutes = ['/main']; // Routes requiring authentication
    const publicRoutes = ['/login']; // Routes accessible without authentication

    if (restrictedRoutes.includes(next.originalPath) && !AuthService.isLoggedIn()) {
      // Prevent access to restricted routes if not logged in
      event.preventDefault();
      $location.path('/login');
    } else if (publicRoutes.includes(next.originalPath) && AuthService.isLoggedIn()) {
      // Redirect logged-in users away from the login page
      event.preventDefault();
      $location.path('/main');
    }
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

  
