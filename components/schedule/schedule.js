// app.controller('CricketController', function($scope, $http) {
//   console.log("CricketController loaded");

//   const url = 'https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-schedule-international';
//   const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': 'cb9753d2f3mshb7f63082ffa4500p19d1f4jsn5e3267162f36',
//       'x-rapidapi-host': 'free-cricbuzz-cricket-api.p.rapidapi.com'
//     }
//   };

//   $http.get(url, options)
//       .then(function(response) {
//         // Handle success
//         $scope.result = response.data; // Store the entire result in scope for debugging
//         console.log(response.data); // Log the response for debugging
//         console.log(response.data.response); //

//         // Check if we have valid schedules and match data
//         if (response.data && response.data.response && response.data.response.schedules) {
//           $scope.schedules = response.data.response.schedules;
//           console.log($scope.schedules); // Log schedules for debugging

//           // Loop through each schedule and each matchList
//           $scope.schedules.forEach(function(schedule) {
//             schedule.matchList.forEach(function(match) {
//               // console.log(match.matchTitle);
//               // console.log(match.length) // Log each match title
//               match.seriesName = match.seriesName; // Extract seriesName
//               match.matchTitle = match.seriesList[0].matchTitle; // Extract matchTitle
//               match.matchDesc = match.seriesList[0].matchDesc; // Extract matchDesc
//               match.venue = match.seriesList[0].venue; // Extract venue
//               match.startDate = match.seriesList[0].startDate; // Extract startDate
//             });
//           });
//         }
//       })
//       .catch(function(error) {
//         // Handle error
//         console.error(error);
//         $scope.result = null; // If there's an error, set result to null
//       });
//   });

app.controller('CricketController', function($scope, $http, $interval) {
  console.log("CricketController loaded");

  const url = 'https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-schedule-international';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cb9753d2f3mshb7f63082ffa4500p19d1f4jsn5e3267162f36',
      'x-rapidapi-host': 'free-cricbuzz-cricket-api.p.rapidapi.com'
    }
  };

  function fetchData() {
    $http.get(url, options)
      .then(function(response) {
        // Handle success
        $scope.result = response.data;
        console.log(response.data); // Log the full response for debugging

        // Check if we have valid schedules and match data
        if (response.data && response.data.response && response.data.response.schedules) {
          $scope.schedules = response.data.response.schedules;
          console.log($scope.schedules); // Log schedules for debugging

          // Loop through each schedule and each matchList
          $scope.schedules.forEach(function(schedule) {
            schedule.matchList.forEach(function(match) {
              match.seriesName = match.seriesName;
              match.matchTitle = match.seriesList[0].matchTitle;
              match.matchDesc = match.seriesList[0].matchDesc;
              match.venue = match.seriesList[0].venue;
              match.startDate = match.seriesList[0].startDate;
            });
          });
        }
      })
      .catch(function(error) {
        // Handle error
        console.error(error);
        $scope.result = null; // If there's an error, set result to null
      });
  }

  // Fetch initial data
  fetchData();

  // Refresh the data every 60 seconds (60000 milliseconds)
  $interval(fetchData, 60000);

  // Cleanup interval when the controller is destroyed
  $scope.$on('$destroy', function() {
    if (angular.isDefined(fetchData)) {
      $interval.cancel(fetchData); // Cancel the interval on controller destruction
    }
  });

});
