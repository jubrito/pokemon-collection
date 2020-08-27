import React from 'react';

import Header from '../../components/Header';
import TopBar from '../../components/TopBar';

function handleBackHome(){
    return true;
}

const NotFound = () => {
    return (
        <>
            <Header />
            <TopBar handleBackHome={handleBackHome} />
            <div id="page-home">
                <div className="content">
                <section className="pokemonList">
                    <ul>
                        <li>
                            <p>Ops.. Page not found! :(</p>
                        </li>
                    </ul>
                </section>
                </div>
            </div>
        </>
    );
}

export default NotFound;