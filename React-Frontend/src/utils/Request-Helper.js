/**
 * This is a Helper file that helps to retrieve and send data to server
 * GetInitialData - Get request for getting all the movies in the database
 * GetRequestedMovieScore - Get request for getting score for a requested movie only if movie and provider exists
 * SubmitScore - Post request adding Movie score from a provider (returns added or returns already exists if provider has already provided scores)
 */
import APIEndpoint from "../evvironment/Environment";
import helperFunctions from "./Helper";

const serverRequests = {
    GetInitialData: async() => {
        let moviesList = [];
        await fetch(APIEndpoint + 'api/get_all')
        .then(res => res.json())
        .then(data => moviesList = helperFunctions.GroupMoviesTogether(data))
        return moviesList;
    },

    GetRequestedMovieScore: async(movie, provider) => {
        const response = await fetch(APIEndpoint + 'api/get_requested_movie?movie=' + movie + '&provider=' + provider);
        return response.json()
    },

    SubmitScore: async (movie, provider, score) => {
        const data = new FormData();
        data.append('movie', movie);
        data.append('provider', provider);
        data.append('score', score);
        const response = await fetch(APIEndpoint + 'api/add_ratings', {
            method: 'POST',
            body: data
        });
        return response.json();
    }

}

export default serverRequests;
