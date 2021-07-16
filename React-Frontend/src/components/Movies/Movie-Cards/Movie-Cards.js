import { Component } from 'react';
import cardImage from '../../../assets/movie-card-image.png';
import './Movie-Cards.css'
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import StarRatings from '../Star-Ratings/Star-Ratings';
import MovieDetails from '../Movie-Details/Movie-Details';

class MovieCards extends Component {
    constructor(props) {
        super(props);
        this.state = { stars: [...Array(5).keys()], ratings: 0, providers: [], showDetails: false };
        this.showDetailsOfACard = this.showDetailsOfACard.bind(this);
    }

    /**
     * Shows details of a movie with rating providers
     * @param {*} providers 
     */
    showDetailsOfACard(providers) {
        if (providers.length > 0) {
            this.setState({
                providers: providers,
                showDetails: true
            })
        }
    }

    /**
     * Switch backs to the main component where all movies are listed
     */
    backToMainComponent() {
        this.setState({
            showDetails: false
        })
    }

    render() {
        return (
            <div className="movie__list">
                { this.state.showDetails ? 
                    <>
                    <Button variant="light" className="back__button" onClick={this.backToMainComponent.bind(this)}>Back</Button>
                    <MovieDetails providers={ this.state.providers } /> </> :
                    this.props.movieList.map((movie, index) => 
                        <Card key={index} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={ cardImage } alt="Image not available!" />
                            <Card.Body>
                                <Card.Title>{movie.movie}</Card.Title>
                                <StarRatings ratings={ movie.overallRatings/2 }/>
                                <Card.Text>
                                    Ratings: { movie.overallRatings.toFixed(1) }
                                </Card.Text>
                                <Button variant="dark" onClick={this.showDetailsOfACard.bind('', movie.providers)}>Show Details</Button>
                            </Card.Body>
                            </Card>
                    )
                }
            </div>
        )
    }
}

export default MovieCards;