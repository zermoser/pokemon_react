import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex justify-between items-center bg-yellow-500 p-4">
      <img src="/path/to/pokemon-logo.png" alt="Pokemon Logo" className="h-8" />
      <input type="text" placeholder="Search name Pokémon ..." className="p-2 rounded bg-white"/>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 18.364L1.757 15 5.121 11.636M5 18.364h14M5 18.364l3.364-3.364M18.364 15H5m0 0h13.364" />
          </svg>
          <span>Username</span>
        </div>
        <div className="relative">
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{totalQuantity}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.2 8.6a1 1 0 001 1.4h11.6a1 1 0 001-1.4L17 13M5.4 5h13.2" />
          </svg>
          <span>Pocket</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
