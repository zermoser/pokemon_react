import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../features/pokemonSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.items);
  const status = useSelector((state) => state.pokemon.status);
  const [view, setView] = useState('grid');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemon());
    }
  }, [status, dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2>Product ({pokemon.length})</h2>
        <div>
          <button onClick={() => setView('grid')} className="mr-2">Grid</button>
          <button onClick={() => setView('list')}>List</button>
        </div>
      </div>
      <div className={view === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-col'}>
        {pokemon.map((poke, index) => (
          <div key={index} className="border p-4">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={poke.name} className="w-full"/>
            <h3>{poke.name}</h3>
            <Link to={`/detail/${index + 1}`} className="bg-black text-white p-2 mt-2 inline-block">Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
