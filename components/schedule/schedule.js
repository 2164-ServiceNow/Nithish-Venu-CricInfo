// var sc = angular.module('CricInfo.schedule', []);
// sc.component('schedule', {
//     templateUrl: 'components/schedule/schedule.html',
//     controller: function () {
//       this.schedules = [
//         { match: "Team A vs Team B", date: "2025-02-15", time: "14:30", venue: "Stadium 1" },
//         { match: "Team C vs Team D", date: "2025-02-16", time: "18:00", venue: "Stadium 2" },
//         { match: "Team E vs Team F", date: "2025-02-17", time: "20:00", venue: "Stadium 3" },
//       ];
//     },
// });


// angular.module('CricInfo.schedule', [])
//   .controller('ScheduleController', function($scope) {
//     $scope.schedules = [
//       { match: "Team A vs Team B", date: "2025-02-15", time: "14:30", venue: "Stadium 1" },
//       { match: "Team C vs Team D", date: "2025-02-16", time: "18:00", venue: "Stadium 2" },
//       { match: "Team E vs Team F", date: "2025-02-17", time: "20:00", venue: "Stadium 3" }
//     ];
//   });

// angular.module('schedulepage', [])
//   .component('schedule', {
//     templateUrl: 'components/schedule/schedule.html',
//     controller: function () {
//       var $ctrl = this;
//       $ctrl.schedules = [
//         { match: 'Team A vs Team B', date: '2024-01-22', time: '6:00 PM', venue: 'Stadium X' },
//         { match: 'Team C vs Team D', date: '2024-01-23', time: '4:00 PM', venue: 'Stadium Y' },
//       ];
//     },
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
  });
  app.component('schedule', {
    templateUrl: 'components/schedule/schedule.html', // Path to the HTML template
    controller: 'CricketController'
});



