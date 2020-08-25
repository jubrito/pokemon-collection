import React, {useEffect, useState } from 'react';

import axios from 'axios';

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
        axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
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
    
    return (
        <div id="page-informations">
            <div className="content">
                <li>
                    {
                        <ul>
                            <li>
                                <h3>Name:</h3>
                                {pokemon.name}
                            </li>
                            <li>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} title={pokemon.name}/>
                            </li>
                            <li>
                                <h3>Weight:</h3>
                                {pokemon.weight}
                            </li>
                            <li>
                                <h3>Stats:</h3>
                                {pokemon.stats.map(item => (
                                    <ul key={item.stat.name}>
                                        <li>
                                            <p>
                                                {item.stat.name}:&nbsp;
                                                {item.base_stat}
                                            </p>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                            <li>
                                <h3>Abilities:</h3>
                                {pokemon.abilities.map(item => (
                                    <ul key={item.ability.name}>
                                        <li>
                                            <p>
                                                {item.ability.name}:&nbsp;
                                                slot {item.slot}
                                            </p>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        </ul>
                    }
                </li>
            </div>
        </div>
    );
}

export default Informations;