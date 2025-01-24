app.controller('CricketController', function ($scope, $http) {
  console.log("CricketController loaded");
 
  const url = "https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co/schedules/international?lastTimeStamp=1665014400000";
  const options = {
    method: "GET",
    headers: {
      "x-apihub-key": "1edoPt4XHQVdjIcA5nJQKQRcRiA9tdU3QiTNxq8N-AldSJgvCW",
      "x-apihub-host": "Cricbuzz-Official-Cricket-API.allthingsdev.co",
      "x-apihub-endpoint": "7d581b76-1a2f-4cd3-b74f-cacde2978526",
    },
  };
 
  $scope.schedules = [];
  $scope.result = null;
 
  function fetchData() {
    $http.get(url, options)
      .then(function (response) {
        // Store raw result for debugging
        $scope.result = response.data;
 
        // Transform the matchScheduleMap into a usable format
        if (response.data.matchScheduleMap) {
          $scope.schedules = response.data.matchScheduleMap.map((scheduleWrapper) => {
            return {
              date: scheduleWrapper.scheduleAdWrapper.date,
              matches: scheduleWrapper.scheduleAdWrapper.matchScheduleList.map((match) => {
                return match.matchInfo.map((info) => ({
                  matchId: info.matchId,
                  seriesName: match.seriesName,
                  matchDesc: info.matchDesc,
                  matchFormat: info.matchFormat,
                  startDate: new Date(parseInt(info.startDate)),
                }));
              }).flat(), // Flatten nested match arrays
            };
          });
        }
 
        console.log($scope.schedules); // Debugging transformed schedules
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
      });
  }
 
  // Fetch data on controller load
  fetchData();
});
 

 
  app.component('schedule', {
    templateUrl: 'components/schedule/schedule.html', // Path to the HTML template
    controller: 'CricketController'
});



