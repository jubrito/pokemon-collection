

import React, { ChangeEvent } from 'react';

interface Props {
    handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    handlePokemonName?: () => string,
}


const TopBar: React.FC<Props> = ({ handleInputChange, handlePokemonName }) => {
    if (handleInputChange) {
        return (
            <div id="page-top-bar">
                <div className="content">
                    <section className="searchBar">
                        <div>
                            <input 
                                type="text" 
                                onChange={handleInputChange}
                                placeholder="Search for a Pokemon..."/>
                        </div>
                    </section>
                </div>
            </div>
        )
    } else {
        return (
            <div id="page-top-bar">
            <div className="content">
                <section className="searchBar">
                    <div>
                        <p>{handlePokemonName}</p>
                    </div>
                </section>
            </div>
        </div>
        )
    }
}

export default TopBar;