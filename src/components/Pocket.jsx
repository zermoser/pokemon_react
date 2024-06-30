import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Pocket = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleConfirm = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Process to Checkout',
      text: 'Click Submit to Checkout',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Thank you so much!"
      });

      dispatch(clearCart());
      navigate('/');
    }
  };

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Remove this Pokémon from your pocket?',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545'
    });

    if (result.isConfirmed) {
      dispatch(removeFromCart({ id }));
      await Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Your item has been removed.',
      });
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <Navbar />
      <div className="pt-4 pb-8 sm:px-20 bg-[#FAFAFA] h-full">
        <div className="flex">
          <div className="w-2/3">
            <h2><b>Pokemons List ({cartItems.length})</b></h2>
            <table className="min-w-full mt-3 divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium w-4/6">Product Name</th>
                  <th className="px-6 py-3 text-center font-medium w-1/6">Quantity</th>
                  <th className="w-1/6 text-center" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((pokemon, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-full w-full" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{capitalizeFirstLetter(pokemon.name)}</div>
                          <div className="text-sm">
                            {pokemon.types.map((type, index) => (
                              <span key={index} className="inline-block h-[24px] px-2 rounded-[8px] text-[#FFAE33] bg-[#FFF4E3] mr-2 mt-1">
                                {capitalizeFirstLetter(type)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm">{pokemon.quantity}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleRemove(pokemon.id)}
                        className="text-black hover:text-red-500"
                      >
                        <i className="far fa-trash-can" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3 p-4 border-gray-200 relative">
            <div className="bg-[#FFF9E3] rounded-t-lg p-4">
              <h2 className="text-lg font-semibold px-2">Order Summary</h2>
            </div>
            <div className="text-sm py-4 px-6 bg-white">
              <div className="flex justify-between mt-2 mb-4">
                <p>Subtotal</p>
                <p><b>{cartItems.length} Products</b></p>
              </div>
              <div className="flex justify-between mb-5">
                <p>Total Quantity</p>
                <p><b>{subtotal} Quantity</b></p>
              </div>
              <button
                onClick={handleConfirm}
                className="bg-[#FF6F61] text-white mt-4 p-4 w-full rounded hover:bg-red-500"
              >
                Process to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pocket;
