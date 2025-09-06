export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SHOHOJCART</h1>
          <div className="flex items-center space-x-6 text-gray-600 font-medium">
            <span className="cursor-pointer hover:text-blue-600">Cart</span>
            <span className="cursor-pointer hover:text-blue-600">Review</span>
            <span className="text-blue-600 font-semibold">Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-10">
        {/* Left Column - Shipping Info */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>

          {/* Delivery / Pickup Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              Delivery
            </button>
            <button
              type="button"
              className="flex-1 py-2 px-4 bg-white text-gray-700 rounded-md font-medium border border-gray-300 hover:bg-gray-50 transition"
            >
              Pick up
            </button>
          </div>

          {/* Shipping Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full name *</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email address *</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone number *</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Country *</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">City *</label>
              <input
                type="text"
                placeholder="New York"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">State *</label>
              <input
                type="text"
                placeholder="NY"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">ZIP code *</label>
              <input
                type="text"
                placeholder="12345"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
              <span className="text-gray-600 text-sm">I agree to the Terms & Conditions</span>
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Review your cart</h2>

          {/* Cart Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="DuoComfort Sofa Premium"
                  className="w-16 h-16 rounded-md border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">DuoComfort Sofa Premium</h3>
                </div>
              </div>
              <span className="text-gray-800 font-semibold">$320.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="IronLine Desk"
                  className="w-16 h-16 rounded-md border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">IronLine Desk</h3>
                </div>
              </div>
              <span className="text-gray-800 font-semibold">$120.00</span>
            </div>
          </div>

          {/* Discount Code */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Discount code</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                Apply
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$440.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>$450.00</span>
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            Pay Now
          </button>

          <p className="text-center text-gray-500 text-sm mt-2">
            🔒 Secure Checkout — SSL Encrypted
          </p>
        </div>
      </div>
    </div>
  );
}