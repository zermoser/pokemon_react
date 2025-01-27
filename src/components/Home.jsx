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
      {filteredPokemon.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-4">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              <path d="M14.9849 14.9852L20.1408 20.1412" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9851 20.1412L20.1411 14.9852" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d="M17.2707 31.125C24.9221 31.125 31.1248 24.9222 31.1248 17.2708C31.1248 9.61935 24.9221 3.41663 17.2707 3.41663C9.61923 3.41663 3.4165 9.61935 3.4165 17.2708C3.4165 24.9222 9.61923 31.125 17.2707 31.125Z" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M32.5832 32.5833L29.6665 29.6666" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <p className="text-center mt-2">
            Oops! Nothing was found for &quot;{searchQuery}&quot;
            <br />
            Please try to search for something else.
          </p>
        </div>
      ) : (
        filteredPokemon.map((poke, index) => (
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
        ))
      )}
    </div>
  );

  const listHTML = (
    <div className="flex flex-col">
      {filteredPokemon.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-4">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              <path d="M14.9849 14.9852L20.1408 20.1412" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.9851 20.1412L20.1411 14.9852" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d="M17.2707 31.125C24.9221 31.125 31.1248 24.9222 31.1248 17.2708C31.1248 9.61935 24.9221 3.41663 17.2707 3.41663C9.61923 3.41663 3.4165 9.61935 3.4165 17.2708C3.4165 24.9222 9.61923 31.125 17.2707 31.125Z" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.4" d="M32.5832 32.5833L29.6665 29.6666" stroke="#373737" strokeWidth="2.1875" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <p className="text-center mt-2">
            Oops! Nothing was found for &quot;{searchQuery}&quot;
            <br />
            Please try to search for something else.
          </p>
        </div>
      ) : (
        filteredPokemon.map((poke, index) => (
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
                <p className="mt-2"><b>Abilities:</b> {poke.abilities.map(ability => capitalizeFirstLetter(ability)).join(', ')}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );

  // NavbarSearch
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const NavbarSearchMobile = (
    <div className="flex flex-col items-center pb-2 border-b-4 border-[#FAFAFA] sm:px-20 pt-2">
      <Link to="/" className="flex items-center mb-4">
        <img src="/pokemon_react/images/logo.png" alt="Logo" className="max-h-[57px] max-w-[156px]" />
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4.75" stroke="#FFCB05" strokeWidth="1.5" />
          <path d="M6 21C6 21 6 19.75 6 18.5C6 17.25 8.24914 16 12 16C15.7509 16 18 17.25 18 18.5C18 20.375 18 21 18 21" stroke="#FFCB05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Username
      </div>
      <div className="relative group">
        <Link to="/pocket" className="flex items-center group mb-4">
          <i className="fa fa-shopping-bag mt-2 w-6 h-6 text-[#FFCB05] group-hover:text-[#FFCB05] relative text-[20px]">
            <span className="absolute top-0 right-0 bg-black text-white rounded-full px-1 py-0.5 text-[8px]">
              {totalQuantity}
            </span>
          </i>
          &nbsp;Pocket
        </Link>
      </div>
    </div>
  );

  const NavbarSearchDesktop = (
    <div className="flex justify-between items-center pb-2 border-b-4 border-[#FAFAFA] sm:px-20 pt-2">
      <Link to="/" className="flex items-center">
        <img src="/pokemon_react/images/logo.png" alt="Logo" className="max-h-[57px] max-w-[156px]" />
      </Link>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search Pokémon by name ..."
          className={`py-2 pl-8 px-16 rounded bg-gray-200 focus:bg-white outline-none border ${isInputFocus ? 'border-yellow-400' : 'border-gray-300'}`}
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4.75" stroke="#FFCB05" strokeWidth="1.5" />
            <path d="M6 21C6 21 6 19.75 6 18.5C6 17.25 8.24914 16 12 16C15.7509 16 18 17.25 18 18.5C18 20.375 18 21 18 21" stroke="#FFCB05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Username
        </div>
        <div style={{ color: '#FFCB05' }}>
          |
        </div>
        <div className="relative group">
          <Link to="/pocket" className="flex items-center group">
            <i className="fa fa-shopping-bag mt-2 w-6 h-6 text-[#FFCB05] group-hover:text-[#FFCB05] relative text-[20px]">
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
      {window.innerWidth >= 768 ? NavbarSearchDesktop : NavbarSearchMobile}
      <div className="py-4 sm:px-20">
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
          <div className="flex items-center justify-center">
            Loading...
            <img src={pikachuRunningGif} alt="Loading" className="h-24 w-24 ml-2" />
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
