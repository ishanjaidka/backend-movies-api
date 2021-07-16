import { Component } from 'react';
import './Movie-Details.css'
import { Table } from 'react-bootstrap';

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <h1>{ this.props.providers[0].movie }</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Provider</th>
                        <th>Ratings</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.providers.map((provider, index) => <tr key={index}>
                            <td>{index + 1}</td>
                            <td> {provider.provider}</td>
                            <td> {provider.rating} </td>
                        </tr> ) }
                    </tbody>
                    </Table>
            </>
        )
    }
}

export default MovieDetails;