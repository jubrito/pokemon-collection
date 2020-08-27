import React, {useEffect, useState } from 'react';

import axios from 'axios';

import Header from '../../components/Header';
import TopBar from '../../components/TopBar';

interface PokemonResponse {
    name: string;
    id: number;
    stats: [
        {
            base_stat: number,
            stat: {
                name: string,
            }
        }
    ];
    abilities: [
        {
            ability: {
                name: string,
            },
            slot: number,
        }
    ];
    weight: number;
}

interface Props {
    match: {
        params: {
            id: number;
        }
    }
}

const Informations: React.FC<Props> = (props) => {

    const [ loading, setLoading ] = useState(true);

    const [pokemon, setPokemon] = useState<PokemonResponse>(
        {name: '', 
        weight: 0, 
        id: 1,
        stats: [
            {
                base_stat: 0,
                stat: {
                    name: '',
                }
            }
        ],
        abilities: [
            {
                ability: {
                    name: '',
                },
                slot: 1,
            }
        ],
    });

    useEffect(() => {
        var id = props.match.params.id;
        setLoading(true);
        axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
            setLoading(false);
            const { name, weight, id, stats, abilities } = response.data;
            setPokemon({
                name, 
                weight,
                id,
                stats,
                abilities,
            });
            console.log(response.data);
            // return response;
        });
    }, []);

    function handlePokemonName(){
        return pokemon.name;
    }
    
    return (
        <>
            <Header />
            <TopBar handlePokemonName={handlePokemonName} />
            <div id="page-informations">
                <div className="content">
                    <section className="pokemonInfo">
                        <div className="pokemonInfo__image">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} title={pokemon.name}/>
                        </div>
                        <div className="pokemonInfo__text">
                            {
                                <>
                                    <h2>{pokemon.name}</h2>
                                    <h3>WEIGHT</h3>
                                    <ul>
                                        <li>
                                            <ul>
                                                <li>
                                                    <p>{pokemon.weight}</p>
                                                </li>
                                            </ul>
                                        </li>
                                        <h3>STATS</h3>
                                        <li>
                                            {pokemon.stats.map(item => (
                                                <ul key={item.stat.name}>
                                                    <li>
                                                        <p>
                                                            <strong>{item.stat.name}:&nbsp;</strong>
                                                            {item.base_stat}
                                                        </p>
                                                    </li>
                                                </ul>
                                            ))}
                                        </li>
                                        <h3>ABILITIES</h3>
                                        <li>
                                            {pokemon.abilities.map(item => (
                                                <ul key={item.ability.name}>
                                                    <li>
                                                        <p>
                                                            <strong>{item.ability.name}:&nbsp;</strong>
                                                            slot {item.slot}
                                                        </p>
                                                    </li>
                                                </ul>
                                            ))}
                                        </li>
                                    </ul>
                                </>
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Informations;