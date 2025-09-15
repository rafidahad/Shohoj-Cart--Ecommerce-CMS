import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Premium Wireless Bluetooth Headphones",
      vendor: "AudioTech",
      price: 79.99,
      comparePrice: 99.99,
      quantity: 1,
      image: "/api/placeholder/150/150",
      variant: "Midnight Black",
      available: true
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      vendor: "TechFit",
      price: 199.99,
      comparePrice: 249.99,
      quantity: 2,
      image: "/api/placeholder/150/150",
      variant: "Space Gray",
      available: true
    },
    {
      id: 3,
      title: "Wireless Charging Stand",
      vendor: "PowerTech",
      price: 29.99,
      quantity: 1,
      image: "/api/placeholder/150/150",
      variant: "White",
      available: true
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.comparePrice) {
      return sum + ((item.comparePrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
              </svg>
            </div>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Cart Header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="item-count">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <span>Product</span>
              <span className="desktop-only">Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="item-details">
                    <div className="item-info">
                      <Link to={`/products/${item.id}`} className="item-title">
                        {item.title}
                      </Link>
                      <p className="item-vendor">{item.vendor}</p>
                      {item.variant && (
                        <p className="item-variant">{item.variant}</p>
                      )}

                      {/* Mobile Price */}
                      <div className="mobile-price">
                        <span className="current-price">${item.price}</span>
                        {item.comparePrice && (
                          <span className="compare-price">${item.comparePrice}</span>
                        )}
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Desktop Price */}
                  <div className="item-price desktop-only">
                    <span className="current-price">${item.price}</span>
                    {item.comparePrice && (
                      <span className="compare-price">${item.comparePrice}</span>
                    )}
                  </div>

                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={!item.available}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 13H5V11H19V13Z" />
                        </svg>
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={!item.available}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                        </svg>
                      </button>
                    </div>
                    {!item.available && (
                      <p className="out-of-stock">Out of stock</p>
                    )}
                  </div>

                  <div className="item-total">
                    <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                    {item.comparePrice && (
                      <span className="savings">
                        Save ${((item.comparePrice - item.price) * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="cart-footer">
              <Link to="/" className="continue-shopping">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-details">
              <div className="summary-line">
                <span>Subtotal ({totalItems} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {totalSavings > 0 && (
                <div className="summary-line savings">
                  <span>Total Savings</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>

              {subtotal < 50 && shipping > 0 && (
                <div className="shipping-notice">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8H17V4H15V8H9V4H7V8H4V10H6V16H8V10H10V16H12V10H14V16H16V10H18V16H20V10H22V8H20Z" />
                  </svg>
                  <span>Add ${(50 - subtotal).toFixed(2)} more for free shipping</span>
                </div>
              )}

              <div className="summary-line">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="checkout-section">
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>

              <div className="payment-icons">
                <span>We accept:</span>
                <div className="icons">
                  <div className="payment-icon">VISA</div>
                  <div className="payment-icon">MC</div>
                  <div className="payment-icon">AMEX</div>
                  <div className="payment-icon">PP</div>
                </div>
              </div>

              <div className="security-info">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                </svg>
                <span>Secure checkout guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
