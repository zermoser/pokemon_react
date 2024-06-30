import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const NavbarSearchMobile = (
    <div className="flex flex-col items-center pb-2 border-b-4 border-[#FAFAFA] sm:px-20 pt-2">
      <Link to="/" className="flex items-center mb-4">
        <img src="/images/logo.png" alt="Logo" className="max-h-[57px] max-w-[156px]" />
      </Link>
      <div className="flex items-center space-x-2 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4.75" stroke="#FFCB05" strokeWidth="1.5" />
          <path d="M6 21C6 21 6 19.75 6 18.5C6 17.25 8.24914 16 12 16C15.7509 16 18 17.25 18 18.5C18 20.375 18 21 18 21" stroke="#FFCB05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Username
      </div>
      <div className="relative group">
        <Link to="/pocket" className="flex items-center group mb-4">
          <i className="fa fa-shopping-bag mt-2 w-6 h-6 text-[#FFCB05] group-hover:text-[#FFCB05] relative">
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
        <img src="/images/logo.png" alt="Logo" className="max-h-[57px] max-w-[156px]" />
      </Link>
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
      {window.innerWidth >= 768 ? NavbarSearchDesktop : NavbarSearchMobile}
    </div>
  );
};

export default Navbar;
