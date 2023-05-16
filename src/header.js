import React from 'react';
import './header.css';
import header1 from './tic.png'
const Header = (e) => {
	return ( 
        <div className="header">
            <h1>TIC-TAC-TOE</h1>
            <img src={header1} alt=""/>
            <br></br>
        </div>
    );
}

export default Header;