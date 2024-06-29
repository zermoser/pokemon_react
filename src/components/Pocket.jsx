import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';
import Swal from 'sweetalert2';

const Pocket = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    Swal.fire({
      icon: 'success',
      title: 'Thanks, Pokemon will send to your Email',
    });
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-2/3">
          <h2>Pokemons in Pocket</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
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
            onClick={handleCheckout}
            className="bg-red-500 text-white p-2 mt-4"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pocket;
