import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../features/pokemonSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.items);
  const status = useSelector((state) => state.pokemon.status);
  const [view, setView] = useState('grid'); // State to manage view type (grid or list)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemon());
    }
  }, [status, dispatch]);

  // Function to toggle view between grid and list
  const toggleView = (newView) => {
    setView(newView);
  };

  // Define grid and list HTML separately
  const gridHTML = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((poke, index) => (
        <div key={index} className="h-full border mx-4 rounded-lg shadow-md bg-white">
          <div className="h-[250px] p-4 flex items-center justify-center">
            <img
              src={`https://img.pokemondb.net/artwork/${poke.name.toLowerCase()}.jpg`}
              alt={poke.name}
              className={`h-full w-full`}
            />
          </div>
          <div className="h-[128px] bg-[#FAFAFA] p-3">
            <h3 className="text-lg font-semibold">{poke.name}</h3>
            <div className="space-x-2 my-1">
              {(poke.types || []).map((type, idx) => (
                <b
                  key={idx}
                  className={`text-center h-[24px] w-[56px] p-1 rounded-[8px] text-[#FFAE33] bg-[#FFF4E3]`}
                >
                  {type}
                </b>
              ))}
            </div>
            <Link to={`/detail/${index + 1}`} className="bg-black text-white p-2 mt-2 inline-block w-full text-center rounded">Detail</Link>
          </div>
        </div>
      ))}
    </div>
  );

  const listHTML = (
    <div className="flex flex-col">
      {pokemon.map((poke, index) => (
        <Link key={index} to={`/detail/${index + 1}`} className="border p-4 rounded-lg shadow-md bg-white flex items-center hover:bg-gray-100 transition-colors duration-300 ease-in-out">
          <div className="h-[128px] flex items-center justify-center">
            <img
              src={`https://img.pokemondb.net/artwork/${poke.name.toLowerCase()}.jpg`}
              alt={poke.name}
              className={`h-full w-32`}
            />
          </div>
          <div className="h-[128px] ml-4 p-3 flex flex-col justify-between w-full">
            <div>
              <h3 className="text-lg font-semibold">{poke.name}</h3>
              <div className="space-x-2 my-1">
                {(poke.types || []).map((type, idx) => (
                  <b
                    key={idx}
                    className={`text-center h-[24px] w-[56px] p-1 rounded-[8px] text-[#FFAE33] bg-[#FFF4E3]`}
                  >
                    {type}
                  </b>
                ))}
              </div>
              <p className="mt-2"><strong>Abilities:</strong> {poke.abilities.join(', ')}</p> {/* Display abilities */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Products ({pokemon.length})</h2>
          <div>
            <button
              onClick={() => toggleView('grid')}
              className={`mr-2 ${view === 'grid' ? 'bg-yellow-400' : 'bg-gray-200'} p-2 rounded`}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button
              onClick={() => toggleView('list')}
              className={`${view === 'list' ? 'bg-yellow-400' : 'bg-gray-200'} p-2 rounded`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
        {view === 'grid' ? gridHTML : listHTML}
      </div>
    </div>
  );
};

export default Home;
