import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Pokemon Shop</h1>
      <input type="text" placeholder="Search Pokemon" className="p-2 rounded"/>
      <div className="relative">
        <span className="absolute -top-2 -right-2 bg-red-500 rounded-full px-2 py-1 text-xs">{totalQuantity}</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.2 8.6a1 1 0 001 1.4h11.6a1 1 0 001-1.4L17 13M5.4 5h13.2" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
