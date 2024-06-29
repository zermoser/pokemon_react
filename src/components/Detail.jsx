import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../features/cartSlice';

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
    };
    fetchPokemonDetail();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites, quantity }));
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-1/3" />
        <div className="ml-4">
          <h2>{pokemon.name}</h2>
          <p>Stats: {pokemon.stats.map(stat => <span key={stat.stat.name}>{stat.stat.name}: {stat.base_stat} </span>)}</p>
          <p>Abilities: {pokemon.abilities.map(ability => <span key={ability.ability.name}>{ability.ability.name} </span>)}</p>
          <div className="flex items-center mt-4">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-300 p-2">-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-300 p-2">+</button>
          </div>
          <button onClick={handleAddToCart} className="bg-red-500 text-white p-2 mt-4">Add To Pocket</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
