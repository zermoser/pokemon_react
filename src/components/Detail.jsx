import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

const mockPokemonData = {
  id: 1,
  name: 'bulbasaur',
  types: ['grass', 'poison'],
  stats: [
    { stat: { name: 'hp' }, base_stat: 45 },
    { stat: { name: 'attack' }, base_stat: 49 },
    { stat: { name: 'defense' }, base_stat: 49 },
    { stat: { name: 'special-attack' }, base_stat: 65 },
    { stat: { name: 'special-defense' }, base_stat: 65 },
    { stat: { name: 'speed' }, base_stat: 45 },
  ],
  abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
};

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    // Mocking the API call with static data
    setPokemon(mockPokemonData);
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id: pokemon.id, name: pokemon.name, sprites: { front_default: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg` }, quantity }));
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <Link to="/" className="mr-4 text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <img src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} alt={pokemon.name} className="w-1/3" />
        <div className="ml-4">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <div className="flex space-x-2 mt-2">
            {pokemon.types.map((type) => (
              <span key={type} className={`px-2 py-1 rounded text-white ${type === 'grass' ? 'bg-green-500' : 
                                  type === 'poison' ? 'bg-purple-500' : 
                                  type === 'fire' ? 'bg-red-500' : 
                                  type === 'water' ? 'bg-blue-500' : 
                                  type === 'flying' ? 'bg-blue-300' : 
                                  type === 'bug' ? 'bg-green-300' : 
                                  'bg-gray-500'}`}>
                {type}
              </span>
            ))}
          </div>
          <p className="mt-2">Stats: {pokemon.stats.map(stat => <span key={stat.stat.name} className="mr-1">{stat.stat.name}: {stat.base_stat} </span>)}</p>
          <p className="mt-2">Abilities: {pokemon.abilities.map(ability => <span key={ability.ability.name} className="mr-1">{ability.ability.name} </span>)}</p>
          <div className="flex items-center mt-4">
            <span className="mr-2">Quantity:</span>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 p-2 rounded-l">-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 p-2 rounded-r">+</button>
          </div>
          <button onClick={handleAddToCart} className="bg-red-500 text-white p-2 mt-4 w-full rounded">
            Add To Pocket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
