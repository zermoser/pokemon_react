import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Pocket = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you want to Process to Checkout',
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
      text: 'Remove this pokemon from your pocket?',
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
      <div className="p-4">
        <div className="flex">
          <div className="w-2/3">
            <h2>Pokemons List ({cartItems.length})</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Quantity</th>
                  <th />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img src={item.sprites.front_default} alt={item.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-black hover:text-red-900"
                      >
                        <i className="far fa-trash-can" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-1/3 p-4 border-l border-gray-200">
            <h2>Order Summary</h2>
            <div className="text-sm">
              <p>Subtotal: {subtotal} Products</p>
              <p>Total Quantity: {subtotal}</p>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-red-500 text-white p-2 mt-4"
            >
              Process to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pocket;
