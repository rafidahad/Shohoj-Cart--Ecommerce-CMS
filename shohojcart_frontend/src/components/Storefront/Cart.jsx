export default function Cart() {
  // Mock cart data
  const cartItems = [
    { id: 1, name: "Crystal Lamp", price: 39.99, qty: 1 },
    { id: 2, name: "Wooden Base", price: 14.99, qty: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>
                {item.name} x {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold flex justify-between mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
