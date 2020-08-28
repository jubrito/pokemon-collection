import React, { useState, useEffect, ChangeEvent } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import ReactImageFallback from "react-image-fallback";

import Header from '../../components/Header';

import TopBar from '../../components/TopBar';

// Informamos que o axios.get vai retornar um array nesse formato
interface PokemonListResponse {
    results: {
        name: string,
        url: string,
    }[],
}

interface Pokemon {
    name: string;
    url: string;
}

const Home = () => {
    const [ pokemonList, setPokemonList ] = useState<Pokemon[]>([{name: '', url: ''}]); 
    
    const [ currentPageURL ] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1048");
    const [ loading, setLoading ] = useState(true);
    
    const [ search, setSearch ] = useState("");
    
    const [ filteredPokemons, setfilteredPokemons ] = useState([{name: '', url: ''}]);
    
    useEffect(() => {
        // every time we make a request, loading is true
        setLoading(true);
        let cancelOldRequest: any;
        axios.get<PokemonListResponse>(currentPageURL,
            {
                //options we want to pass to get:
                cancelToken: new axios.CancelToken(c => cancelOldRequest = c)
            }).then(response => {
            // console.log(response.data.results);
            setLoading(false);
            console.log(response.data.results);
            const pokemonData = response.data.results;
            setPokemonList(pokemonData);
            setfilteredPokemons(pokemonData);
        });
        // cancel previous request every time we make a new one, making sure the application never loads old data
        return () => cancelOldRequest();
    }, [currentPageURL]);

    useEffect(() => {
        var filteredPokemonList = pokemonList;
        if (search !== '') {
            const filter = search.toLowerCase();
             filteredPokemonList = pokemonList.filter(
                (pokemon)=>{
                    return(pokemon.name.search(filter) !== -1);
                });
                    //if you cannot find this search within the name then do not return it, on the instance you can find it, return the content (keep that content within the pokemonlist)
        } 
            setfilteredPokemons(filteredPokemonList);
    }, [search, pokemonList]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    if (loading) return (
        <>
            <Header />
            <TopBar handleInputChange={handleInputChange} />
            <div id="page-home">
                <div className="content">
                    <section className="pokemonList">
                        <p>Loading...</p>
                    </section>
                </div>
            </div>
        </>
    );
    else return (
        <>
            <Header />
            <TopBar handleInputChange={handleInputChange} />
            <div id="page-home">
                <div className="content">
                    <section className="pokemonList">
                        <ul>
                        {
                            filteredPokemons.map(poke => (
                                <li 
                                    key={poke.name} 
                                    id={poke.url.slice(34, -1)}
                                    >
                                    <Link to={`/pokemon/${poke.url.slice(34, -1)}`}>
                                        <ReactImageFallback
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.slice(34, -1)}.png`} 
                                            fallbackImage={'/default-image.png'}
                                            initialImage={'/pokeball-loading.gif'}
                                            alt={poke.name} 
                                            />
                                        <p>{poke.name}</p>
                                    </Link>
                                </li>
                            ))
                        }
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;