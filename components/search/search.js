app.controller('PlayerController', ['$scope', '$http', function($scope, $http) {
  $scope.searchQuery = "";  // Initialize search query
  $scope.playerData = null;
  $scope.playerProfile = null;

  // Function to search for players
  $scope.searchPlayer = function() {
      if (!$scope.searchQuery) {
          return; // Do nothing if search query is empty
      }

      // Replace spaces with '+' for URL-friendly search
      const playerName = $scope.searchQuery.replace(/\s+/g, '+');
      
      const myHeaders = {
          // "x-apihub-key": "dN2hrADmGAywYvWKWGsKXQMdLEa0f-hkzbSs55AiGfteghuSH-",
          // "x-apihub-host": "Cricbuzz-Official-Cricket-API.allthingsdev.co",
          // "x-apihub-endpoint": "b0242771-45ea-4c07-be42-a6da38cdec41"
          'x-rapidapi-key': 'cb9753d2f3mshb7f63082ffa4500p19d1f4jsn5e3267162f36',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      };

      const requestOptions = {
          method: "GET",
          headers: myHeaders
      };

      // Construct the API URL using the player's name dynamically
      const apiUrl = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search?plrN=${playerName}`;

      $http.get(apiUrl, requestOptions)
          .then(function(response) {
              // Success: display the result in the scope
              if (response.data && response.data.player && response.data.player.length > 0) {
                  $scope.playerData = response.data.player;
              } else {
                  $scope.playerData = [];
                  $scope.errorMessage = "No player data found.";
              }
              $scope.errorMessage = null;
          })
          .catch(function(error) {
              // Error: display the error message
              console.error('Error fetching data', error);
              $scope.playerData = null;
              $scope.errorMessage = "Error fetching player data. Please try again later.";
          });
  };

  // Function to fetch player profile based on player ID
//     $scope.showPlayerProfile = function(playerId) {
//         const myHeaders = {
//             "x-apihub-key": "dN2hrADmGAywYvWKWGsKXQMdLEa0f-hkzbSs55AiGfteghuSH-",
//             "x-apihub-host": "Cricbuzz-Official-Cricket-API.allthingsdev.co",
//             "x-apihub-endpoint": "b0242771-45ea-4c07-be42-a6da38cdec41"
//         };

//         const requestOptions = {
//             method: "GET",
//             headers: myHeaders
//         };

//         // Construct the API URL using the player's ID dynamically
//         const apiUrl = `https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co/browse/player/${playerId}`;

//         // Fetch player profile details
//         $http.get(apiUrl, requestOptions)
//             .then(function(response) {
//                 // Success: display the profile in the scope
//                 $scope.playerProfile = response.data;
//                 console.log(response.data);
//                 $scope.errorMessage = null;
//             })
//             .catch(function(error) {
//                 // Error: display the error message
//                 console.error('Error fetching profile data', error);
//                 $scope.playerProfile = null;
//                 $scope.errorMessage = "Error fetching player profile data. Please try again later.";
//             });
//     };
// }]);

// $scope.showPlayerProfile = function(playerId) {
//     const myHeaders = {
//         "x-apihub-key": "dN2hrADmGAywYvWKWGsKXQMdLEa0f-hkzbSs55AiGfteghuSH-",
//         "x-apihub-host": "Cricbuzz-Official-Cricket-API.allthingsdev.co",
//         "x-apihub-endpoint": "b0242771-45ea-4c07-be42-a6da38cdec41"
//     };

//     const requestOptions = {
//         method: "GET",
//         headers: myHeaders
//     };

//     // Construct the API URL using the player's ID dynamically
//     const apiUrl = `https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co/browse/player/${playerId}`;

//     // Fetch player profile details
//     $http.get(apiUrl, requestOptions)
//         .then(function(response) {
//             // Success: display the profile in the scope
//             $scope.playerProfile = response.data;

//             // Log data for debugging
//             console.log(response.data);

//             // Clear any previous error message
//             $scope.errorMessage = null;
//         })
//         .catch(function(error) {
//             // Error: display the error message
//             console.error('Error fetching profile data', error);
//             $scope.playerProfile = null;
//             $scope.errorMessage = "Error fetching player profile data. Please try again later.";
//         });
// };
// }]);
$scope.showPlayerProfile = function(playerId) {
  const apiUrl = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}`; // Use the new API endpoint
  const requestOptions = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': 'cb9753d2f3mshb7f63082ffa4500p19d1f4jsn5e3267162f36',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };

  // Fetch player profile details
  $http({
      method: requestOptions.method,
      url: apiUrl,
      headers: requestOptions.headers
  })
  .then(function(response) {
      // Success: Display the profile in the scope
      $scope.playerProfile = response.data;

      // Log data for debugging
      console.log(response.data);

      // Clear any previous error message
      $scope.errorMessage = null;
  })
  .catch(function(error) {
      // Error: Display the error message
      console.error('Error fetching profile data', error);
      $scope.playerProfile = null;
      $scope.errorMessage = "Error fetching player profile data. Please try again later.";
  });
};
}]);