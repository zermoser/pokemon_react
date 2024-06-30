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
      <div className="flex justify-between items-center mb-4">
        <h2>Products ({pokemon.length})</h2>
        <div>
          <button 
            onClick={() => setView('grid')} 
            className={`mr-2 ${view === 'grid' ? 'bg-yellow-400' : 'bg-gray-200'} p-2 rounded`}
          >
            Grid
          </button>
          <button 
            onClick={() => setView('list')} 
            className={`${view === 'list' ? 'bg-yellow-400' : 'bg-gray-200'} p-2 rounded`}
          >
            List
          </button>
        </div>
      </div>
      <div className={view === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-col'}>
        {pokemon.map((poke, index) => (
          <div 
            key={index} 
            className={`border p-4 ${view === 'list' ? 'flex items-center' : ''}`}
          >
            <img 
              src={`https://img.pokemondb.net/artwork/${poke.name.toLowerCase()}.jpg`} 
              alt={poke.name} 
              className={`w-full ${view === 'list' ? 'w-16 h-16 mr-4' : ''}`} 
            />
            <div>
              <h3>{poke.name}</h3>
              {view === 'list' && <p className="text-gray-500">#{index + 1}</p>}
              <Link to={`/detail/${index + 1}`} className="bg-black text-white p-2 mt-2 inline-block">Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
