import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex justify-between items-center p-4">
      <Link to="/" className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="h-[57px] w-[156px]" />
      </Link>
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
};

export default Navbar;
