app.controller('RegisterController', function ($scope, $http, $location) {
  $scope.signup = function (user) {
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check if email already exists
    $http.get('http://localhost:3000/users?email=' + user.email).then(
      function (response) {
        if (response.data.length > 0) {
          // Email already exists
          alert('Email is already registered. Please use a different email.');
        } else {
          // Fetch the last user's ID to determine the next ID
          $http.get('http://localhost:3000/users?_sort=id&_order=desc&_limit=1').then(
            function (idResponse) {
              const lastId = idResponse.data.length > 0 ? idResponse.data[0].id : 100; // Start from 100 if no users
              user.id = lastId + 1;

              // Register the user
              $http.post('http://localhost:3000/users', user).then(
                function (response) {
                  alert('Signup successful!');
                  $location.path("/login")
                },
                function (error) {
                  console.error('Error while registering user:', error);
                }
              );
            },
            function (error) {
              console.error('Error while fetching last ID:', error);
            }
          );
        }
      },
      function (error) {
        console.error('Error while checking email:', error);
      }
    );
  };
});
