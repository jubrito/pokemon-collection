import React from 'react';

import imgHeader from '../../assets/pokemon-logo.png';

const Header = () => {
    return (
        <>
            <header>
                <img src={imgHeader} alt="Pokemón Logo" title="Pokemón Logo"/>
            </header>
            <div className="afterEffects"></div>
        </>
    );
}

export default Header;