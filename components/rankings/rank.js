app.controller('RankingsController', ['$scope', '$http', function ($scope, $http) {
  const apiKey = 'cb9753d2f3mshb7f63082ffa4500p19d1f4jsn5e3267162f36';
  const apiHost = 'cricbuzz-cricket2.p.rapidapi.com';
  const playerBaseUrl = 'https://cricbuzz-cricket2.p.rapidapi.com/stats/v1/rankings';
  const teamBaseUrl = 'https://cricbuzz-cricket2.p.rapidapi.com/stats/v1/rankings/teams';

  // Default data
  $scope.rankings = [];
  $scope.isTeamRanking = false; // Toggle for team/player rankings

  // Fetch player rankings
  $scope.fetchRankings = function (type, format) {
    $scope.isTeamRanking = false; // Set to player mode
    $http({
      method: 'GET',
      url: `${playerBaseUrl}/${type}?isWomen=0&formatType=${format}`,
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    }).then(
      function success(response) {
        console.log(response.data);
        // Map player rankings
        $scope.rankings = response.data.rank.map((player) => ({
          rank: player.rank,
          name: player.name,
          country: player.country,
          rating: player.rating,
          trend: player.trend || 'Flat',
          imageUrl: `https://www.cricbuzz.com/a/img/v1/600x600/i1/c${player.faceImageId}/player.jpg`, // Player image URL
        }));
      },
      function error(error) {
        console.error('Error fetching player rankings:', error);
        $scope.rankings = [];
      }
    );
  };

  // Fetch team rankings
  $scope.fetchTeamRankings = function (format) {
    $scope.isTeamRanking = true; // Set to team mode
    $http({
      method: 'GET',
      url: `${teamBaseUrl}?formatType=${format}`,
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    }).then(
      function success(response) {
        console.log(response.data);
        // Map team rankings
        $scope.rankings = response.data.rank.map((team) => ({
          rank: team.rank,
          name: team.name, // Team name
          country: team.teamName, // Use team name as country for consistency
          rating: team.rating,
          points:team.points, 
        }));
      },
      function error(error) {
        console.error('Error fetching team rankings:', error);
        $scope.rankings = [];
      }
    );
  };

  // Default call: T20 player rankings
  $scope.fetchRankings('batsmen', 't20');
}]);
