import { Component } from 'react';
import './Star-Ratings.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class StarRatings extends Component {
    constructor(props) {
        super(props);
        this.state = { stars: [...Array(5).keys()] };
    }

    render() {
        return (
            <div>
                {this.state.stars.map((star, index) => 
                <FontAwesomeIcon key={index} icon="star" className={ (index < Math.round(this.props.ratings)) ? 'checked' : 'unchecked' } fixedWidth  />
                )}
            </div>
        )   
    }
}

export default StarRatings