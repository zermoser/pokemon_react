import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../features/pokemonSlice';
import { Link } from 'react-router-dom';
import Header from './Header';

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
    <div>
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Products ({pokemon.length})</h2>
          <div>
            <button 
              onClick={() => setView('grid')} 
              className={`mr-2 ${view === 'grid' ? 'bg-yellow-400' : 'bg-gray-200'} p-2 rounded`}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button 
              onClick={() => setView('list')} 
              className={`${view === 'list' ? 'bg-yellow-400' : 'bg-gray-200'} p-2 rounded`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
        <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'flex flex-col'}>
          {pokemon.map((poke, index) => (
            <div 
              key={index} 
              className={`border p-4 ${view === 'list' ? 'flex items-center' : ''} rounded-lg shadow-md bg-white`}
            >
              <img 
                src={`https://img.pokemondb.net/artwork/${poke.name.toLowerCase()}.jpg`} 
                alt={poke.name} 
                className={`h-4/6 ${view === 'list' ? 'w-32' : 'w-full'}`} 
              />
              <div className={`${view === 'list' ? 'ml-4' : 'text-center'}`}>
                <h3 className="text-lg font-semibold mt-2">{poke.name}</h3>
                <div className="flex justify-center space-x-2 my-2">
                  {(poke.types || []).map((type, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-1 rounded text-white ${type === 'grass' ? 'bg-green-500' : 
                                  type === 'poison' ? 'bg-purple-500' : 
                                  type === 'fire' ? 'bg-red-500' : 
                                  type === 'water' ? 'bg-blue-500' : 
                                  type === 'flying' ? 'bg-blue-300' : 
                                  type === 'bug' ? 'bg-green-300' : 
                                  'bg-gray-500'}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <Link to={`/detail/${index + 1}`} className="bg-black text-white p-2 mt-2 inline-block w-full text-center rounded">Detail</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
