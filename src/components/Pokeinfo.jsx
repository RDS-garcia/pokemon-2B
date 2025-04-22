import React, {useState} from 'react';
import './Pokeinfo.css';

function Pokeinfo(){
    const [buscaTermo, setBuscaTermo] = useState('');
    const [pokemonDados, setPokemonDados] = useState(null);
    const [erro, setErro] = useState('');

    const Busca = async () => {
        try{
            const resp = fetch('https://pokeapi.co/api/v2/pokemon/${buscaTermo.toLowerCase()}');
            if (!resp.ok){
                throw new Error('Pokémon não encontrado');
            }
            const dados = await resp.json();
            setPokemonDados(dados);
            setErro('');
        } catch (err) {
            setErro(err.message);
            setPokemonDados(null);
        }
    };
    return(
        <>  
            <main>
                <h1>Informações sobre Pokemon</h1>

                <input type="text" placeholder='Nº ou Nome do Pokemon' 
                value={buscaTermo} 
                onChange={(e) => setBuscaTermo(e.target.value)} />

                <button onClick={Busca}>Buscar</button>

                {pokemonDados && (
                <div className="info">

                    <h2>{pokemonDados.name}</h2>

                    <img src={pokemonDados.sprites.front_default} 
                    alt={pokemonDados.name} />

                    <p><strong>ID: </strong>{pokemonDados.id}</p>

                    <p><strong>ALTURA: </strong>{pokemonDados.height}</p>

                    <p><strong>PESO: </strong>{pokemonDados.weight}</p>

                    <p><strong>TIPO: </strong>{pokemonDados.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>

                </div>
                )}
            </main>
            
        </>
    );
};
export default Pokeinfo;