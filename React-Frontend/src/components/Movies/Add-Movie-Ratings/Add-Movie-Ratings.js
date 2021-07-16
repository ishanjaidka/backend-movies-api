import React, {useState} from "react";
import './Add-Movie-Ratings.css'
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import serverRequests from "../../../utils/Request-Helper";
import EventEmitter from "../../../utils/EventEmitter";

function AddMovieRatings() {
    const [show, setShow] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [movie, setMovie] = useState('');
    const [provider, setProvider] = useState('');
    const [score, setScore] = useState('');
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
     * Fires when user starts typing into movie input
     * @param {*} event 
     */
    const handleChangeOnMovie = (event) => {
        setMovie(event.target.value)
    }

    /**
     * Fires when user starts typing into provider input
     * @param {*} event 
     */
    const handleChangeOnProvider = (event) => {
        setProvider(event.target.value)
    }


    /**
     * Fires when user starts typing into score input
     * @param {*} event 
     */
    const handleChangeOnScore = (event) => {
        setScore(event.target.value)
    }

    /**
     * Fires when provider/user submits the score for a movie
     * @param {*} event 
     */
    const handleSubmitScore = (event) => {
        // For not reloading the whole app
        event.preventDefault();
        if (movie !== '' && provider !== '' && score !== '') {
            serverRequests.SubmitScore(movie, provider, score).then(res => {
                if(res.message === 'Movie with ratings added!') {
                    EventEmitter.emit('ReloadMovies', {'reload': true});
                }
                EventEmitter.emit('OpenSnackbar', { 'message': res.message})
            })
        } else if (movie === '' || provider === '' || score === '') {
            setEmptyField(true);
            EventEmitter.emit('OpenSnackbar', { 'message': 'Please fill all the fields!'})
        }
        setTimeout(() => {
            setEmptyField(false);
        }, 1500);
    }
  
    return (
      <>
        <Button className="submit__score" variant="dark" onClick={handleShow}>
          Submit Score
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Submit Score for a Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Movie</Form.Label>
                    <Form.Control className={ emptyField && movie === '' ? 'error__input' : '' } value={movie} onChange={handleChangeOnMovie} type="text" placeholder="Enter movie name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Provider</Form.Label>
                    <Form.Control className={ emptyField && provider === '' ? 'error__input' : '' } value={provider} onChange={handleChangeOnProvider} type="text" placeholder="Enter provider/user name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Score</Form.Label>
                    <Form.Control className={ emptyField && score === '' ? 'error__input' : '' } value={score} onChange={handleChangeOnScore} type="text" placeholder="Enter score/rating" />
                </Form.Group>
                <Button className="submit__score" type="submit" onClick={handleSubmitScore}>
                    Submit
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default AddMovieRatings;