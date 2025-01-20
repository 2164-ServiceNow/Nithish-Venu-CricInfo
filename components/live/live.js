// Define the AngularJS module

// LiveMatchesController
app.controller('LiveMatchesController', function ($scope, $http) {
    $scope.matches = []; // Array to store processed match data

    // Function to fetch match data
    $scope.fetchMatches = function () {
        const headers = {
            'x-apihub-key': 'dN2hrADmGAywYvWKWGsKXQMdLEa0f-hkzbSs55AiGfteghuSH-',
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
            console.log("Raw Data:", data);

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
                        }))
                      
                    )
                     
                );
               
               
            }
        })
        .catch((error) => {
            console.error("Error fetching matches:", error);
        });
    };

    // Initial fetch of matches
    $scope.fetchMatches();
});

// Define the component
app.component('live', {
    templateUrl: 'components/cricbuzz/live-matches.html', // Path to your HTML template
    controller: 'LiveMatchesController' // Reference the LiveMatchesController
});
