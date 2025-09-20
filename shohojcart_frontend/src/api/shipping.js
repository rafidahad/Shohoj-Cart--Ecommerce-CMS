import axios from 'axios';

// Centralized API handler for shipping endpoints

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const calculateShipping = async (weight, destination) => {
  try {
    const response = await axios.post(`${API_BASE}/shipping/calculate`, {
      weight,
      destination,
    });
    return response.data;
  } catch (error) {
    console.error('Shipping cost calculation error:', error);
    return { success: false, message: 'Failed to calculate shipping cost' };
  }
};

export const bookShipment = async (shipmentData) => {
  try {
    const response = await axios.post(`${API_BASE}/shipping/book`, shipmentData);
    return response.data;
  } catch (error) {
    console.error('Shipment booking error:', error);
    return { success: false, message: 'Failed to book shipment' };
  }
};
