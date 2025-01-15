var app = angular.module('CricInfo', ['ngRoute']);
 
app.config(function ($routeProvider) {
   
  $routeProvider
    .when('/login', {
      templateUrl: 'components/login/login.html',
      controller: 'LoginController',
    })
    .when('/register', {
      templateUrl: 'components/register/register.html',
      controller: 'RegisterController',
    })
    .when('/home',{
        templateUrl: 'components/home/home.html',
        controller: 'HomeController',
    })
    .otherwise({
      redirectTo: '/login',
    });
    $locaionProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});