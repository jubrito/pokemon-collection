import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination';

import * as defaultImg from '../../assets/default-image.jpg';

import ReactImageFallback from "react-image-fallback";

import Header from '../../components/Header';

import TopBar from '../../components/TopBar';

type Nullable<String> = String | null;

// Informamos que o axios.get vai retornar um array nesse formato
interface PokemonListResponse {
    results: {
        name: string,
        url: string,
    }[],
    next?: string;
    previous?: string;
}

interface Pokemon {
    name: string;
    url: string;
}

const Home = () => {
    // const [ pokemon, setPokemon ] = useState<Pokemon[]>([{name:'', url:'', id: 0, img: ''}]);
    const [ pokemonList, setPokemonList ] = useState<Pokemon[]>([{name: '', url: ''}]); 
    
    const [ currentPageURL, setCurrentPageURL ] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1048");
    const [ nextPageURL, setNextPageURL ] = useState<Nullable<String>>();
    const [ prevPageURL, setPrevPageURL ] = useState<Nullable<String>>();
    const [ loading, setLoading ] = useState(true);
    
    const pokemonSize = 200;
    const [ pokemonId, setPokemonId ] = useState(0);

    // var pokemonId = String(pokemonList.indexOf(poke)+1);

    const [ firstPage, setFirstPage ] = useState(false);
    const [ lastPage, setLastPage ] = useState(false);

    const [ search, setSearch ] = useState("");

    const [ filteredPokemons, setfilteredPokemons ] = useState([{name: '', url: ''}]);
    const [ fullList, setFullList ] = useState([{name: '', url: ''}]);

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
            // const pokemonData = response.data.results.map(poke => poke.url);
            setLoading(false);
            console.log(response.data.results);
            const pokemonData = response.data.results;
            const next = response.data.next;
            const previous = response.data.previous;
            // setNextPageURL(next);
            // setPrevPageURL(previous);
            setPokemonList(pokemonData);
            setfilteredPokemons(pokemonData);
            setFullList(pokemonData);
        });
        // cancel previous request every time we make a new one, making sure the application never loads old data
        return () => cancelOldRequest();
    }, [currentPageURL]);

    useEffect(() => {
        if (pokemonId < 20) setFirstPage(true);
    }, [pokemonId]);

    useEffect(() => {
        if (pokemonId >= pokemonSize) setLastPage(true);
    }, [pokemonId]);

    function gotoNextPage() {
        if (!lastPage) {
            setPokemonId(pokemonId + 20);
        }
        if (nextPageURL !== null) {
            setCurrentPageURL(String(nextPageURL));
        }
    }
    
    function gotoPrevPage() {
        if (!firstPage) {
            setPokemonId(pokemonId - 20);
        }
        if (prevPageURL !== null) {
            setCurrentPageURL(String(prevPageURL));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    useEffect(() => {
        if (search !== '') {
            const filter = search.toLowerCase();
            var filteredP = pokemonList;
             filteredP = pokemonList.filter(
                (pokemon)=>{
                    if (pokemon.name.search(filter) !== -1) {
                        return pokemon;
                    } else {
                        return;
                    }
                });
                    //if you cannot find this search within the name then do not return it, on the instance you can find it, return the content (keep that content within the pokemonlist)
            setfilteredPokemons(filteredP);
        } else {
            setfilteredPokemons(fullList);
        }
    }, [search]);

    useEffect(() => {
        filteredPokemons.map(poke =>  {
            var id = Number(poke.url.slice(34, -1));
            setPokemonId(id);
        })
    }, [filteredPokemons]);


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
            {/* <Pagination 
                gotoPrevPage={gotoPrevPage}
                gotoNextPage={gotoNextPage}
            /> */}
            <TopBar handleInputChange={handleInputChange} />
            <div id="page-home">
                <div className="content">
                    <section className="pokemonList">
                        <ul>
                        {
                            filteredPokemons.map(poke => (
                                <li key={poke.name} id={poke.url.slice(34, -1)}>
                                {/* <li key={poke.name} id={String(pokemonId+filteredPokemons.indexOf(poke)+1)}> */}
                                    {/* <Link to={`/pokemon/${pokemonList.indexOf(poke)+1}`}> */}
                                    <Link to={`/pokemon/${poke.url.slice(34, -1)}`}>
                                        {/* <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.slice(34, -1)}.png` || `/default-image.jpg`} 
                                            alt={poke.name} 
                                            title={poke.name}
                                            onError={addDefaultSrc}
                                            /> */}
                                        <ReactImageFallback
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.slice(34, -1)}.png` || `/default-image.jpg`} 
                                            fallbackImage={'/default-image.jpg'}
                                            initialImage={'/pokeball-loading.gif'}
                                            alt={poke.name} 
                                            />
                                        <p>{poke.name}</p>
                                        {/* {(URLExists(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(pokemonId+pokemonList.indexOf(poke)+1)}.png`) ?
                                            <img 
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(pokemonId+pokemonList.indexOf(poke)+1)}.png`} 
                                                alt={poke.name} 
                                                title={poke.name}
                                                onError={addDefaultSrc}
                                            />
                                            :
                                            <img 
                                                src={`/default-image.jpg`} 
                                                alt={poke.name} 
                                                title={poke.name}
                                                onError={addDefaultSrc}
                                            />

                                        )} */}
                                        {/* {pokemon.indexOf(poke)} */}
                                    </Link>
                                </li>
                            // <p>{poke.url}</p>
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