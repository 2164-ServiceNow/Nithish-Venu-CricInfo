app.controller('PlayerController',  function($scope, $http) {
    $scope.searchQuery = "";  // Initialize search query
    $scope.playerData = null; // List of players
    $scope.playerProfile = null; // Selected player's profile
    $scope.errorMessage = null; // Error message

    // Function to search for players
    $scope.searchPlayer = function() {
        if (!$scope.searchQuery) {
            return; // Do nothing if search query is empty
        }

        // Replace spaces with '+' for URL-friendly search
        const playerName = $scope.searchQuery.replace(/\s+/g, '+');

        const myHeaders = {
            'x-rapidapi-key': '775b256dc0mshf54a83086a20d8bp1322ccjsn7071b3630aa7',
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
                    $scope.playerData = response.data.player; // Update player data
                    $scope.errorMessage = null; // Clear error message
                } else {
                    $scope.playerData = [];
                    $scope.errorMessage = "No player data found.";
                }
            })
            .catch(function(error) {
                // Error: display the error message
                console.error('Error fetching data', error);
                $scope.playerData = null;
                $scope.errorMessage = "Error fetching player data. Please try again later.";
            });
    };

    // Function to fetch and display player profile
    $scope.showPlayerProfile = function(playerId) {
        const apiUrl = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}`; // API endpoint for profile
        const requestOptions = {
            method: 'GET',
            headers: {
                // 'x-rapidapi-key': '775b256dc0mshf54a83086a20d8bp1322ccjsn7071b3630aa7',
                'x-rapidapi-key': 'af11df5fe8msh8c779a5dc8de434p152bd7jsnfdd02a5a8324',
                'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        $http({
            method: requestOptions.method,
            url: apiUrl,
            headers: requestOptions.headers
        })
        .then(function(response) {
            // Success: Display the profile in the scope
            $scope.playerProfile = response.data;

            // Clear the list of players to show only the profile
            $scope.playerData = null;

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
});
app.component('player', {
    templateUrl: 'components/search/search.html', // Path to the HTML template
    controller: 'PlayerController'
});