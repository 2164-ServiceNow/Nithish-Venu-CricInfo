app.controller('LoginController', function ($scope, $http, $location) {
    console.log('hello');
    $scope.login = function (credentials) {
      $http.get('http://localhost:3000/users').then(
        function (response) {
          const users = response.data;
          console.log(users);
          const user = users.find(
            u =>
              u.email === credentials.email &&
              u.password === credentials.password
          );
          console.log(user);
 
          if (user) {
            alert('Login successful!');
            // Redirect based on user type or other conditions
            $location.path('/main'); // Adjust the path as needed
          } else {
            alert('Invalid email or password.');
          }
        },
        function (error) {
          console.error('Error:', error);
        }
      );
    };
  });
 