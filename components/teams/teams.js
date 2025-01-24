app.controller('TeamsController', function ($scope, $http) {
    $scope.isLoading = true;
    $scope.error = null;
    $scope.teams = [];
    $scope.selectedTeamPlayers = null;
    $scope.selectedTeamName = '';

    const teamApiUrl = 'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international';
    const playerApiUrl = 'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/{teamId}/players';
    const headers = {
        'x-rapidapi-key': '34161d796bmsh96679a1da642acap131853jsned9c82384471',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    };

    // Fetch teams
    $http.get(teamApiUrl, { headers })
        .then((response) => {
            $scope.teams = response.data.list.filter(team => team.imageId);
            $scope.isLoading = false;
        })
        .catch((error) => {
            $scope.error = 'Failed to load teams. Please try again later.';
            console.error(error);
            $scope.isLoading = false;
        });

    // Fetch players for a selected team
    $scope.loadTeamPlayers = function (team) {
        if ($scope.selectedTeamName === team.teamName) {
            // If the same team is clicked, clear selection and hide dropdown
            $scope.selectedTeamName = '';
            $scope.selectedTeamPlayers = null;
        } else {
            // Otherwise, load the team’s players and show the dropdown
            $scope.selectedTeamName = team.teamName;
            $http.get(playerApiUrl.replace('{teamId}', team.teamId), { headers })
                .then((response) => {
                    $scope.selectedTeamPlayers = response.data.player.map(player => ({
                        name: player.name,
                        imageId: player.imageId // Ensure this key exists in the response
                    }));
                })
                .catch((error) => {
                    console.error('Failed to load players:', error);
                    $scope.selectedTeamPlayers = [];
                });
        }
    };
});

app.component('teams', {
    templateUrl: 'components/teams/teams.html', // Path to your HTML template
    controller: 'TeamsController' // Reference the LiveMatchesController
});
