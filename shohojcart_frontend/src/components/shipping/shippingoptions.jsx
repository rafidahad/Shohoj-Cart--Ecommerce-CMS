import React, { useState, useEffect } from "react";
import { calculateShipping } from "../../api/shipping";

const ShippingOptions = ({ weight, destination, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCost = async () => {
      setLoading(true);
      setError("");
      const result = await calculateShipping(weight, destination);
      if (result.success) {
        setCost(result.cost);
      } else {
        setError(result.message || "Unable to fetch shipping cost");
      }
      setLoading(false);
    };

    if (weight && destination) {
      fetchCost();
    }
  }, [weight, destination]);

  const handleSelect = () => {
    if (cost) {
      onSelect({
        method: "Steadfast Courier",
        cost,
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Shipping Options</h2>
      {loading && <p>Loading shipping cost...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {cost && (
        <div className="flex flex-col space-y-2">
          <p>
            Steadfast Courier: <span className="font-bold">৳{cost}</span>
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleSelect}
          >
            Select This Shipping
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;
