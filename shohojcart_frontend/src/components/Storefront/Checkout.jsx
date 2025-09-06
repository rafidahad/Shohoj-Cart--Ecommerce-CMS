export default function Checkout() {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="w-full p-2 border rounded"
        />
        <button className="w-full px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Place Order
        </button>
      </form>
    </div>
  );
}
