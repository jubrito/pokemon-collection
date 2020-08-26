import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination';

import * as defaultImg from '../../assets/default-image.jpg';

import Header from '../../components/Header';

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
    
    const [ currentPageURL, setCurrentPageURL ] = useState("https://pokeapi.co/api/v2/pokemon?offset=100&limit=1048");
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
            // const pokemm = response.data.results.map(poke => poke.url);
            setLoading(false);
            console.log(response.data.results);
            const pokemm = response.data.results;
            const next = response.data.next;
            const previous = response.data.previous;
            // setNextPageURL(next);
            // setPrevPageURL(previous);
            setPokemonList(pokemm);
            setfilteredPokemons(pokemm);
            setFullList(pokemm);
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
                    // return pokemon.name.toLowerCase().search(filter) !== -1;
                        // pokemon.name.startsWith(filter);
                        // console.log(pokemon.name.startsWith("a", 0));
                        // return pokemon.name.includes(filter);
                });
                    //if you cannot find this search within the name then do not return it, on the instance you can find it, return the content (keep that content within the pokemonlist)
                    
                    // var name = String(pokemon.name);
                    // console.log(search);
                    // var  name.filter(item => {
                    //     return filteredPokemons.includes(search);
                    // });
            setfilteredPokemons(filteredP);
        } else {
            // console.log("full"+fullList);
            setfilteredPokemons(fullList);
        }
    }, [search]);

    // function addDefaultSrc(event: SyntheticEvent<HTMLImageElement, Event>){
    function addDefaultSrc(event: SyntheticEvent<HTMLImageElement>){
        // console.log("target"+event.target.removeEventListener);
        // event.currentTarget.src = '../../../public/default-image.jpg';
        event.currentTarget.src = '/default-image.jpg';
        
    }

    function URLExists(url: string){
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!==404;
    }

    if (loading) return (
        <>
            <Header />
            <p>Loading...</p>
        </>
    );
    else return (
        <>
            <Header />
            {/* <Pagination 
                gotoPrevPage={gotoPrevPage}
                gotoNextPage={gotoNextPage}
            /> */}
            <div id="page-home">
                <div className="content">
                    <input 
                        type="text" 
                        onChange={handleInputChange}
                        placeholder="Search a Pokemon..."/>
                    <ul>
                    {
                        filteredPokemons.map(poke => (
                            <li key={poke.name} id={String(pokemonId+filteredPokemons.indexOf(poke)+1)}>
                                {/* <Link to={`/pokemon/${pokemonList.indexOf(poke)+1}`}> */}
                                <Link to={`/pokemon/${pokemonId}`}>
                                    <p>{poke.name}</p>
                                    <img 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(pokemonId+pokemonList.indexOf(poke)+1)}.png` || `/default-image.jpg`} 
                                        alt={poke.name} 
                                        title={poke.name}
                                        onError={addDefaultSrc}
                                    />
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
                </div>
            </div>
        </>
    );
}

export default Home;