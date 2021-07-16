import { useState, useEffect } from 'react';
import './Movies.css'
import MovieCards from './Movie-Cards/Movie-Cards';
import EventEmitter from '../../utils/EventEmitter';
import AddMovieRatings from './Add-Movie-Ratings/Add-Movie-Ratings';
import serverRequests from '../../utils/Request-Helper';

function Movies() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        /**
         * Event Listener when a movie is searched
         * @param {*} eventData 
         */
        const searchMovie = (eventData) => {
            if (Object.keys(eventData).length !== 0) {
                const newMovie = [eventData];
                EventEmitter.emit('OpenSnackbar', { 'message': eventData.providers[0].provider +'\'s entered score is: ' + eventData.overallRatings});
                setMovies([...newMovie])
            }
        }

        /**
         * Event Listener when a movie score is added to the movies
         * @param {*} eventData 
         */
        const reloadMovies = (eventData) => {
            getInitialData();
        }
       
        /**
         * Fetch all movies at start
         */
        const getInitialData = async() => {
            const moviesList = await serverRequests.GetInitialData();
            setMovies([...moviesList]);
        }
        getInitialData();

        const searchListener = EventEmitter.addListener('SearchRequested', searchMovie);
        const reloadMoviesListener = EventEmitter.addListener('ReloadMovies', reloadMovies);
        
        return () => {
            searchListener.remove();
            reloadMoviesListener.remove();
        }
        
    }, [])


    return (
        <>
        {/* <Topnav movies={movies}/> */}
        <AddMovieRatings />
        <div className="movie__list">
            {movies.length > 0 ?
            <>
                <MovieCards movieList={movies} /> </> : 
                <h1>Loading data!</h1>
            }
        </div>
        </>
    )
}

export default Movies;