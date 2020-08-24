import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

// Informamos que o axios.get vai retornar um array nesse formato
interface PokemonListResponse {
    results: {
        name: string,
        url: string,
    }[]
}

interface Pokemon {
    name: string,
    url: string,
}

const Home = () => {
    // const [ pokemon, setPokemon ] = useState<Pokemon[]>([{name:'', url:'', id: 0, img: ''}]);
    const [ pokemonList, setPokemonList ] = useState<Pokemon[]>([{name:'', url:''}]); 

    const [ pokemonID, setPokemonID ] = useState(0);

    useEffect(() => {
        axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon/`).then(response => {
            // console.log(response.data.results);
            // const pokemm = response.data.results.map(poke => poke.url);
            const pokemm = response.data.results;
            setPokemonList(pokemm);
                // setPokemon(pokemm => ({
                //     ...pokemm,
                //     [id]: 
                // }));
                // console.log(pokemm);
            return response;
        });
    }, []);

    return (
        <div id="page-home">
            <div className="content">
                {/* {
                    initialize();
                } */}
                <ul>
                {
                    pokemonList.map(poke => (
                        <li key={poke.name} id={String(pokemonList.indexOf(poke)+1)}>
                            <Link to={`/pokemon/${pokemonList.indexOf(poke)+1}`}>
                                <p>{poke.name}</p>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(pokemonList.indexOf(poke)+1)}.png`} alt={poke.name} title={poke.name}/>
                                {/* {pokemon.indexOf(poke)} */}
                            </Link>
                        </li>
                    // <p>{poke.url}</p>
                    ))
                }
                </ul>
            </div>
        </div>
    );
}

export default Home;