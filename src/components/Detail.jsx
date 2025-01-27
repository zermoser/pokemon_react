import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

import pikachuRunningGif from '../assets/pikachu-running.gif';

const Detail = () => {
  const { id: pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = {
          id: response.data.id,
          name: response.data.name,
          types: response.data.types.map(type => type.type.name),
          stats: response.data.stats.map(stat => ({
            stat: { name: stat.stat.name },
            base_stat: stat.base_stat
          })),
          abilities: response.data.abilities.map(ability => ({
            ability: { name: ability.ability.name }
          }))
        };
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: pokemon.id,
      name: pokemon.name,
      sprites: { front_default: `https://img.pokemondb.net/artwork/${pokemon.name}.jpg` },
      types: pokemon.types,
      quantity
    }));
    navigate('/pocket');
  };

  if (!pokemon) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
        <img src={pikachuRunningGif} alt="Loading" className="h-24 w-24" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pt-4 pb-8 sm:px-20 bg-[#FAFAFA] h-full">
        <Link to="/" className="flex items-center text-[#373737]">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4 md:flex">
          <img src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`} alt={pokemon.name} className="h-auto md:h-2/3 mx-auto md:ml-0 md:mr-4" />
          <div className="mt-4 md:mt-0 md:w-2/3">
            <h2 className="text-2xl font-bold capitalize">{capitalizeFirstLetter(pokemon.name)}</h2>
            <div className="flex space-x-2 mt-2">
              {pokemon.types.map((type, index) => (
                <span key={index} className="inline-block h-[24px] px-2 rounded-[8px] text-[#FFAE33] bg-[#FFF4E3]">
                  {capitalizeFirstLetter(type)}
                </span>
              ))}
            </div>
            <p className="mt-2">
              <b>Stats</b>: {pokemon.stats.map(stat => <span key={stat.stat.name} className="mr-1">{stat.stat.name}: {stat.base_stat} </span>)}</p>
            <p className="mt-2">
              <b>Abilities</b>: {pokemon.abilities.map((ability, index) => (
                <span key={ability.ability.name}>
                  {index > 0 && ', '}
                  {capitalizeFirstLetter(ability.ability.name)}
                </span>
              ))}
            </p>
            <div className="flex items-center mt-4">
              <span className="mr-10"><b>Quantity</b>: </span>
              <div className="flex items-center border border-[#373737] rounded">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="bg-white py-2 px-4 rounded-l"
                >
                  -
                </button>
                <span className="bg-[#F5F5F5] py-2 px-6">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="bg-white py-2 px-4 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={handleAddToCart} className="bg-[#FF6F61] text-white p-2 mt-4 w-full md:w-2/3 rounded hover:bg-red-500">
              <i className="fa fa-shopping-bag mr-2"/>       
              Add To Pocket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
