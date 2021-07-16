import React, { Component } from 'react';
import './Topnav.css';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EventEmitter from '../../utils/EventEmitter';
import serverRequests from '../../utils/Request-Helper';

class Topnav extends Component {
    constructor(props) {
        super(props);
        this.state = { movie: '', provider: '', score: 0, searchRequested: false };
        this.handleMovieChange = this.handleMovieChange.bind(this);
        this.handleProviderChange = this.handleProviderChange.bind(this);
    }

    /**
     * Search Request from user
     */
    searchRequest = async (movieName, providerName) => {
        let userQuery = {};
        const moviesList = await serverRequests.GetInitialData();
        moviesList.find((movie) => {
            if (movie.movie === movieName.toUpperCase()) {
                movie.providers.forEach((provider) => {
                    if (provider.provider === providerName) {
                        userQuery = { movie: provider.movie, overallRatings: parseFloat(provider.rating), providers: [provider] };
                        EventEmitter.emit('SearchRequested', userQuery);
                        const getScore = serverRequests.GetRequestedMovieScore(this.state.movie, this.state.provider);
                        this.setState({ score: getScore })
                    }
                })
            }
        })
        if(Object.keys(userQuery).length === 0) {
            EventEmitter.emit('OpenSnackbar', { 'message': 'Note: provider/user field is case sensitive, \nMovie or Provider doesn\'t exists!'});
        }

        return userQuery;
    }

    /**
     * Fires when user search with the movie and provider
     */
    handleSearch() {
        if (this.state.movie !== '' && this.state.provider !== '') {
            // Accepts 2 parameter, identifier and listener
            this.searchRequest(this.state.movie, this.state.provider);
            
        } else if(this.state.movie === '' || this.state.provider === '') {
            EventEmitter.emit('OpenSnackbar', { 'message': 'Please fill all the fields!'});
            this.setState({
                searchRequested: true
            });
        }

        setTimeout(() => {
            this.setState({
                searchRequested: false
            });
        }, 1500);
        
    }

    /**
     * When a movie is searched and there is only one movie listed, to go back to the landing page
     */
    handleReset() {
        this.setState({
            movie: '',
            provider: ''
        })
        EventEmitter.emit('ReloadMovies', {'reload': true});
    }

    /**
     * Fires when user starts typing into movie input
     * @param {*} event 
     */
    handleMovieChange(event) {
        this.setState({
            movie: event.target.value
        })
    }

    /**
     * Fires when user starts typing into provider input
     * @param {*} event 
     */
    handleProviderChange(event) {
        this.setState({
            provider: event.target.value
        })
    }

    render() {
        return (
            <Row className="topnav__row">
                <Col className="topnav__row__col" xs="12" md="2">
                <FontAwesomeIcon icon="film" size="2x" fixedWidth  />
                <h3>Movie Ratings</h3>
                </Col>
                    <Col className="topnav__row__col" xs="12" md="4">
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter movie name" className={ this.state.searchRequested && this.state.movie === '' ? 'error__input' : '' } value={this.state.movie} onChange={this.handleMovieChange} required/>
                    </Form.Group>
                    </Col>
                    <Col className="topnav__row__col" xs="12" md="4">
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter provider/user name" className={ this.state.searchRequested && this.state.provider === '' ? 'error__input' : '' } value={this.state.provider} onChange={this.handleProviderChange} required />
                    </Form.Group>
                    </Col>
                    <Col className="topnav__row__col search__and__refresh_buttons" xs="12" md="2">
                        <Button className="search__button" variant="light" onClick={this.handleSearch.bind(this)}><FontAwesomeIcon icon="search" /></Button>
                        <Button className="refresh__button" variant="light" onClick={this.handleReset.bind(this)}><FontAwesomeIcon icon="sync-alt" /></Button>
                    </Col>
                </Row>
        )
    }
}

export default Topnav;