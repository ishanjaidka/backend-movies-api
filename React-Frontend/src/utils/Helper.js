
const helperFunctions = {
    /**
     * Group together Movies with same movie names
     * @param {*} movies list of movies with providers 
     */
    GroupMoviesTogether: async (movies) => {
        const groups = movies.reduce((groups, item) => {
            const group = (groups[item.movie] || []);
            group.push(item);
            groups[item.movie] = group;
            return groups
        }, {});
        const moviesList = helperFunctions.CreateArrayOfGroupedMovies(groups);
        return moviesList
    },

    /**
     * Convert object into arrays for getting overall ratings for a movie and different providers for that movie
     * @param {*} groupedMovies Object of objects with movie name as key and providers as array 
     */
    CreateArrayOfGroupedMovies: async (groupedMovies) => {
        const moviesList = [];
        Object.keys(groupedMovies).forEach(function(key) {
            let movie = {};
            let overallRatings = 0;
            for (let provider of groupedMovies[key]) {
                overallRatings +=parseFloat(provider.rating);
            }
            overallRatings = overallRatings / groupedMovies[key].length;
            movie = { movie: key, overallRatings,  providers: groupedMovies[key]};
            moviesList.push(movie);
        });
        return moviesList;
    },

    /**
     * Returns color of Snackbar acording the message
     * @param {*} message 
     * @returns 
     */
    GetColorFromMessage: async(message) => {
        let color = '#578a4c';
        switch(message) {
            case 'Please fill all the fields!':
              color = '#ec4747';
              break;
            case 'Note: provider/user field is case sensitive, \nMovie or Provider doesn\'t exists!':
              color = '#ec4747';
              break;
            case 'Ratings for provider already exists!':
              color = '#ec4747';
              break;
            default:
              color = '#578a4c';
          }

          return color;
    }
}


export default helperFunctions