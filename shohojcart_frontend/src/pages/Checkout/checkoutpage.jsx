import React, { useState } from "react";
import ShippingOptions from "../components/shipping/shippingoptions";
import { bookShipment } from "../api/shipping";
import axios from "axios";

const Checkout = ({ cartItems, user, onOrderComplete }) => {
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (!shipping) {
      setError("Please select a shipping method.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Create order in your backend
      const orderResponse = await axios.post("/api/orders", {
        items: cartItems,
        shipping_method: shipping.method,
        shipping_cost: shipping.cost,
      });

      const orderId = orderResponse.data.id;

      // Step 2: Book shipment with Steadfast
      const shipmentResponse = await bookShipment({
        order_id: orderId,
        recipient_name: user.name,
        recipient_phone: user.phone,
        recipient_address: user.address,
        weight: cartItems.reduce((sum, item) => sum + item.weight, 0),
      });

      if (!shipmentResponse.success) {
        setError("Order placed but shipment booking failed.");
      }

      onOrderComplete(orderId);
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <ShippingOptions
        weight={cartItems.reduce((sum, item) => sum + item.weight, 0)}
        destination={user.address}
        onSelect={setShipping}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
