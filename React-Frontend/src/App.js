import React from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import Topnav from './components/Topnav/Topnav';
import PositionedSnackbar from './components/shared/components/Snackbar/Snackbar';

// Font-awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faFilm, faStar, faSyncAlt, faBars  } from '@fortawesome/free-solid-svg-icons'


library.add(faSearch, faFilm, faStar, faSyncAlt, faBars)

function App() {
    return ( 
    <div className = "App">
        <Topnav />
        <Movies />
        <PositionedSnackbar />
        </div>
    );
}

export default App;