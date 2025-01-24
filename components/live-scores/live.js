


app.controller('LiveMatchesController', function ($scope, $http) {
    $scope.matches = []; // Array to store matches
    $scope.selectedMatch = null; // Selected match for details
    $scope.scorecard = null; // Store scorecard details
     // apikey : 7aMI5lp6yf6bFwZk86OtttWKIzvi2RCmzVMeeWtXu-9M88YQCm
     //apikey : 1edoPt4XHQVdjIcA5nJQKQRcRiA9tdU3QiTNxq8N-AldSJgvCW
    // Fetch live matches
    $scope.fetchMatches = function () {
        const headers = {
            'x-apihub-key': '1edoPt4XHQVdjIcA5nJQKQRcRiA9tdU3QiTNxq8N-AldSJgvCW',
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
            console.log(response.data);
            console.log(data);
            if (data && data.typeMatches) {
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
                            status: match.matchInfo.status,
                            state:match.matchInfo.state,
                            ground: match.matchInfo.venueInfo.ground
                        }))
                    )
                );
            }
        })
        .catch((error) => {
            console.error('Error fetching matches:', error);
        });
    };

    // Fetch scorecard details
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
            $scope.scorecard = response.data;
            console.log(response.data);
            console.log("Score card :"+response.data);
        
            $scope.selectedMatch = $scope.matches.find(match => match.matchId === matchId);
        })
        .catch((error) => {
            console.error('Error fetching scorecard:', error);
        });
         // Reset to match list view
  
    };

    // Reset to match list view
    

    // Fetch matches on load
    $scope.fetchMatches();
});
app.component('live', {
    templateUrl: 'components/live-scores/live.html', // Path to the HTML template
    controller: 'LiveMatchesController'
});