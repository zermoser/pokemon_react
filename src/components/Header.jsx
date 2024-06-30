import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex justify-between items-center p-4">
      <Link to="/" className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="h-8" />
      </Link>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search Pokémon by name ..."
          className="p-2 pl-8 pr-4 rounded bg-gray-200 focus:bg-white outline-none w-60 md:w-72 lg:w-80"
        />
        <i className="fa fa-search absolute left-2 top-3 text-[#FFCB05]"></i>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <i className="far fa-user w-4 h-4 text-[#FFCB05]"></i>
          Username
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
    </header>
  );
};

export default Header;
