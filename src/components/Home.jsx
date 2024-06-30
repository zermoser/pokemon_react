import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from '../features/pokemonSlice';
import { Link } from 'react-router-dom';
import pikachuRunningGif from '../assets/pikachu-running.gif';

const Home = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.items);
  const status = useSelector((state) => state.pokemon.status);
  const [view, setView] = useState('grid'); // State to manage view type (grid or list)
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemon());
    }
  }, [status, dispatch]);

  // Function to toggle view between grid and list
  const toggleView = (newView) => {
    setView(newView);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to clear search query
  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Filtered pokemon based on search query
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define grid and list HTML separately
  const gridHTML = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredPokemon.map((poke, index) => (
        <div key={index} className="h-full border mx-4 rounded-lg shadow-md bg-white">
          <div className="h-[250px] p-4 flex items-center justify-center">
            <img
              src={`https://img.pokemondb.net/artwork/${poke.name.toLowerCase()}.jpg`}
              alt={poke.name}
              className={`h-full w-full`}
            />
          </div>
          <div className="h-[128px] bg-[#FAFAFA] p-3">
            <h3 className="text-lg font-semibold">{capitalizeFirstLetter(poke.name)}</h3>
            <div className="space-x-2 my-1">
              {(poke.types || []).map((type, idx) => (
                <b
                  key={idx}
                  className={`text-center h-[24px] w-[56px] p-1 rounded-[8px] text-[#FFAE33] bg-[#FFF4E3]`}
                >
                  {capitalizeFirstLetter(type)}
                </b>
              ))}
            </div>
            <Link to={`/detail/${index + 1}`} className="bg-black text-white p-2 mt-2 inline-block w-full text-center rounded hover:bg-[#FFAE33]">
              Detail
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  const listHTML = (
    <div className="flex flex-col">
      {filteredPokemon.map((poke, index) => (
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
              <h3 className="text-lg font-semibold">{capitalizeFirstLetter(poke.name)}</h3>
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
              <p className="mt-2"><strong>Abilities:</strong> {poke.abilities.map(ability => capitalizeFirstLetter(ability)).join(', ')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  // NavbarSearch
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const NavbarSearchDesktop = (
    <div className="flex flex-col items-center">
      <Link to="/" className="flex items-center mb-4">
        <img src="/images/logo.png" alt="Logo" className="max-h-[57px] max-w-[156px]" />
      </Link>
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          placeholder="Search Pokémon by name ..."
          className={`p-2 pl-8 pr-4 rounded bg-gray-200 focus:bg-white outline-none border ${isInputFocus ? 'border-yellow-400' : 'border-gray-300'}`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />
        {searchQuery && (
          <button
            className="absolute right-4 top-2 text-[#FFCB05] hover:text-gray-600 focus:outline-none"
            onClick={clearSearchQuery}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        )}
        <i className="fa fa-search absolute left-2 top-3 text-[#FFCB05]"></i>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <i className="far fa-user w-4 h-4 mr-1 text-[#FFCB05]"></i>
        <span className="text-[#FFCB05]">Username</span>
      </div>
      <div className="relative group">
        <Link to="/pocket" className="flex items-center group mb-4">
          <i className="fa fa-shopping-bag mt-2 w-6 h-6 text-[#FFCB05] group-hover:text-[#FFCB05] relative">
            <span className="absolute top-0 right-0 bg-black text-white rounded-full px-1 py-0.5 text-[8px]">
              {totalQuantity}
            </span>
          </i>
          <span className="ml-2 cursor-pointer text-[#FFCB05]">Pocket</span>
        </Link>
      </div>
    </div>
  );

  const NavbarSearchMobile = (
    <div className="flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="max-h-[57px] max-w-[156px]" />
      </Link>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search Pokémon by name ..."
          className={`p-2 pl-8 pr-4 rounded bg-gray-200 focus:bg-white outline-none border ${isInputFocus ? 'border-yellow-400' : 'border-gray-300'}`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />
        {searchQuery && (
          <button
            className="absolute right-4 top-2 text-[#FFCB05] hover:text-gray-600 focus:outline-none"
            onClick={clearSearchQuery}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        )}
        <i className="fa fa-search absolute left-2 top-3 text-[#FFCB05]"></i>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <i className="far fa-user w-4 h-4 mr-1 text-[#FFCB05]"></i>
          Username
        </div>
        <div style={{ color: '#FFCB05' }}>
          |
        </div>
        <div className="relative group">
          <Link to="/pocket" className="flex items-center group">
            <i className="fa fa-shopping-bag mt-2 w-6 h-6 text-[#FFCB05] group-hover:text-yellow-500 relative">
              <span className="absolute top-0 right-0 bg-black text-white rounded-full px-1 py-0.5 text-[8px]">
                {totalQuantity}
              </span>
            </i>
            <span className="ml-2 cursor-pointer">Pocket</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {window.innerWidth <= 768 ? NavbarSearchDesktop : NavbarSearchMobile}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Products ({filteredPokemon.length})</h2>
          <div>
            <button
              onClick={() => toggleView('grid')}
              className={`mr-2 ${view === 'grid' ? 'bg-[#FFCB05]' : 'bg-gray-200'} p-2 rounded`}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button
              onClick={() => toggleView('list')}
              className={`${view === 'list' ? 'bg-[#FFCB05]' : 'bg-gray-200'} p-2 rounded`}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
        {status === 'loading' ? (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="flex items-center">
              Loading...
              <img src={pikachuRunningGif} alt="Loading" className="h-24 w-24 ml-2" />
            </div>
          </div>
        ) : view === 'grid' ? (
          gridHTML
        ) : (
          listHTML
        )}
      </div>
    </div>
  );
};

export default Home;
