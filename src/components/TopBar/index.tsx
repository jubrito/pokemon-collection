

import React, { ChangeEvent } from 'react';

import { Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

interface Props {
    handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    handleBackHome?: () => Boolean,
}


const TopBar: React.FC<Props> = ({ handleInputChange, handleBackHome }) => {
    if (handleInputChange) {
        return (
            <div id="page-top-bar">
                <div className="content">
                    <section className="searchBar">
                        <div>
                            <input 
                                type="text" 
                                onChange={handleInputChange}
                                placeholder="Search for a Pokemón..."/>
                        </div>
                    </section>
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div id="page-top-bar">
                <div className="content">
                    <section className="searchBar">
                    <Link to="/">
                        <FiArrowLeft />
                        <p>
                            All Pokemons
                        </p>
                    </Link>
                    </section>
                </div>
            </div>
        </>
        )
    }
}

export default TopBar;