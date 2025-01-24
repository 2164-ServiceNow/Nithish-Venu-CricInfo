app.controller('NewsController', function ($scope, $http) {
    $scope.isLoading = true;
    $scope.error = null;
    $scope.newsArticles = [];

    const apiUrl = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index';
    const headers = {
        // 'x-rapidapi-key': 'c87094213dmsh668c9d18f0eb8b1p11d416jsnf09a6f7c422b'
        'x-rapidapi-key': '512de4bd0amsheb7ae393da6ef50p1e564ajsn17df7980532d',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    };

    // Fetch news data using $http
    $scope.fetchNews = function () {
        $http.get(apiUrl, { headers })
            .then((response) => {
                const data = response.data;
                console.log(data);
                if (data && data.storyList) {
                    // Map through storyList, ensuring all required properties exist
                    $scope.newsArticles = data.storyList
                        .filter(item => item.story) // Ensure 'story' exists
                        .map(item => ({
                            title: item.story.context || 'Untitled',
                            


                                // Fallback image URL
                            headline: item.story.hline || 'No content available',
                            intro: item.story.intro || 'No content available',
                           

                            publishedAt: item.story.pubTime || 'Unknown date'
                        }));
                } else {
                    $scope.error = 'No news found.';
                }
                $scope.isLoading = false;
            })
            .catch((error) => {
                console.error('Failed to fetch news:', error);
                $scope.error = 'Failed to load news. Please try again later.';
                $scope.isLoading = false;
            });
    };

    // Fetch news when the controller initializes
    $scope.fetchNews();
});


app.component('news', {
    templateUrl: 'components/news/news.html', // Path to the HTML template
    controller: 'NewsController'
});
