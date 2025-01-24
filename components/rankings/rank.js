app.controller('RankingsController', ['$scope', '$http', function ($scope, $http) {
  // const apiKey = '775b256dc0mshf54a83086a20d8bp1322ccjsn7071b3630aa7';
  const apiKey= 'af11df5fe8msh8c779a5dc8de434p152bd7jsnfdd02a5a8324'
  const apiHost = 'cricbuzz-cricket2.p.rapidapi.com';
  const playerBaseUrl = 'https://cricbuzz-cricket2.p.rapidapi.com/stats/v1/rankings';
  const teamBaseUrl = 'https://cricbuzz-cricket2.p.rapidapi.com/stats/v1/rankings/teams';

  // Default data
  $scope.rankings = [];
  $scope.isTeamRanking = false; // Toggle for team/player rankings
  $scope.selectedButton = ''; // Track selected button

  // Select button and highlight it
  $scope.selectButton = function (buttonId) {
    $scope.selectedButton = buttonId;
  };

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
          imageUrl: `https://www.cricbuzz.com/a/img/v1/172x172/i1/c${team.imageId}/${team.name}.jpg`, // Team image URL
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

 app.component('rankings', {
    templateUrl: 'components/rankings/rank.html',
    controller: 'RankingsController',
  });