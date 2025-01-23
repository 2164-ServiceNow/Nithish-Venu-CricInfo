app.controller('LiveMatchesController', function ($scope, $http) {
  $scope.matches = []; // Array to store processed match data
  $scope.selectedMatch = null; // Store selected match details for the scorecard
  $scope.scorecard = null; // Store detailed scorecard data

  // Function to fetch match data
  $scope.fetchMatches = function () {
      const headers = {
          'x-apihub-key': 'FsVNAzfActl4nt3cMqiksEHYH5kNTZPLuCatqpOa5N4BPf-e5b',
          'x-apihub-host': 'Cricbuzz-Official-Cricket-API.allthingsdev.co',
          'x-apihub-endpoint': 'e0cb5c72-38e1-435e-8bf0-6b38fbe923b7'
      };

      $http({
          method: 'GET',
          url: 'https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co/matches/live',
          headers: headers
      })
      .then((response) => {
          const data = response.data;

          if (data && data.typeMatches) {
              // Process typeMatches to extract matches
              $scope.matches = data.typeMatches.flatMap(typeMatch => 
                  typeMatch.seriesMatches.flatMap(series => 
                      series.seriesAdWrapper.matches.map(match => ({
                          matchId: match.matchInfo.matchId,
                          matchDesc: match.matchInfo.matchDesc,
                          seriesName: match.matchInfo.seriesName,
                          team1: match.matchInfo.team1.teamName,
                          team2: match.matchInfo.team2.teamName,
                          venue: match.matchInfo.venueInfo.ground,
                          city: match.matchInfo.venueInfo.city,
                          startDate: new Date(parseInt(match.matchInfo.startDate)).toLocaleString(),
                          endDate: new Date(parseInt(match.matchInfo.endDate)).toLocaleString(),
                          state: match.matchInfo.state,
                          status: match.matchInfo.status,
                          team1Score: match.matchScore?.team1Score || "N/A",
                          team2Score: match.matchScore?.team2Score || "N/A"
                      })))
              );
          }
      })
      .catch((error) => {
          console.error("Error fetching matches:", error);
      });
  };

  // Function to fetch scorecard details
  $scope.fetchScorecard = function (matchId) {
      const headers = {
          'x-apihub-key': 'FsVNAzfActl4nt3cMqiksEHYH5kNTZPLuCatqpOa5N4BPf-e5b',
          'x-apihub-host': 'Cricbuzz-Official-Cricket-API.allthingsdev.co',
          'x-apihub-endpoint': '95df5edd-bd8b-4881-a12b-1a40e519b693'
      };

      $http({
          method: 'GET',
          url: `https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co/match/${matchId}/scorecard`,
          headers: headers
      })
      .then((response) => {
          $scope.scorecard = response.data; // Store scorecard details
          $scope.selectedMatch = $scope.matches.find(match => match.matchId === matchId);
      })
      .catch((error) => {
          console.error("Error fetching scorecard:", error);
      });
  };

  // Initial fetch of matches
  $scope.fetchMatches();
});
