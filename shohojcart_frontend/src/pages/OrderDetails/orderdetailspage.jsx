import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrder(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load order details.");
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <p>Status: {order.status}</p>

      {order.shipping_tracking_id && (
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
          <p>Courier: Steadfast Courier</p>
          <p>Tracking ID: {order.shipping_tracking_id}</p>
          <p>Current Status: {order.shipping_status}</p>
        </div>
      )}

      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={fetchOrder}
      >
        Refresh Status
      </button>
    </div>
  );
};

export default OrderDetails;
