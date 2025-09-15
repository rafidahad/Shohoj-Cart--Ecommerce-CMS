import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  // Mock product data - in real app, this would come from API
  const product = {
    id: id,
    title: "Premium Wireless Bluetooth Headphones",
    vendor: "AudioTech",
    price: 79.99,
    comparePrice: 99.99,
    available: true,
    description: "Experience superior sound quality with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    variants: [
      { id: 'black', title: 'Midnight Black', price: 79.99, available: true },
      { id: 'white', title: 'Pearl White', price: 79.99, available: true },
      { id: 'blue', title: 'Ocean Blue', price: 84.99, available: false }
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour Battery Life",
      "Quick Charge Technology",
      "Premium Leather Padding",
      "Bluetooth 5.0 Connection"
    ],
    specifications: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.0",
      "Frequency Response": "20Hz - 20kHz",
      "Warranty": "2 years"
    },
    reviews: {
      average: 4.8,
      count: 156,
      breakdown: {
        5: 120,
        4: 25,
        3: 8,
        2: 2,
        1: 1
      }
    }
  };

  const relatedProducts = [
    {
      id: 2,
      title: "Wireless Charging Stand",
      price: 29.99,
      image: "/api/placeholder/300/300"
    },
    {
      id: 3,
      title: "Premium Cable Set",
      price: 19.99,
      image: "/api/placeholder/300/300"
    },
    {
      id: 4,
      title: "Travel Case",
      price: 39.99,
      image: "/api/placeholder/300/300"
    }
  ];

  const handleAddToCart = () => {
    console.log('Adding to cart:', {
      productId: product.id,
      variant: selectedVariant,
      quantity: quantity
    });
  };

  const currentVariant = product.variants.find(v => v.id === selectedVariant) || product.variants[0];

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">›</span>
            <Link to="/collections/electronics">Electronics</Link>
            <span className="separator">›</span>
            <span className="current">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="product-layout">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="main-image-img"
              />
              {!product.available && (
                <div className="sold-out-overlay">
                  <span>Sold Out</span>
                </div>
              )}
            </div>

            <div className="thumbnail-grid">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details">
            <div className="product-header">
              <p className="vendor">{product.vendor}</p>
              <h1 className="product-title">{product.title}</h1>

              {/* Reviews */}
              <div className="reviews-summary">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`star ${i < Math.floor(product.reviews.average) ? 'filled' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="rating-text">{product.reviews.average} ({product.reviews.count} reviews)</span>
              </div>

              {/* Price */}
              <div className="price-section">
                <div className="price-display">
                  <span className="current-price">${currentVariant.price}</span>
                  {product.comparePrice && (
                    <span className="compare-price">${product.comparePrice}</span>
                  )}
                </div>
                {product.comparePrice && (
                  <div className="savings">
                    Save ${(product.comparePrice - currentVariant.price).toFixed(2)} ({Math.round(((product.comparePrice - currentVariant.price) / product.comparePrice) * 100)}% off)
                  </div>
                )}
              </div>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {/* Variant Selection */}
              <div className="option-group">
                <label className="option-label">Color</label>
                <div className="variant-options">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`variant-option ${selectedVariant === variant.id ? 'selected' : ''} ${!variant.available ? 'unavailable' : ''}`}
                      onClick={() => setSelectedVariant(variant.id)}
                      disabled={!variant.available}
                    >
                      {variant.title}
                      {!variant.available && <span className="unavailable-text">Sold out</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="option-group">
                <label className="option-label">Quantity</label>
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="purchase-section">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!currentVariant.available}
              >
                {currentVariant.available ? 'Add to Cart' : 'Sold Out'}
              </button>

              <button className="buy-now-btn">
                Buy it now
              </button>

              <div className="product-features">
                {product.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info">
              <div className="info-item">
                <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
                <div>
                  <strong>Free shipping</strong>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="info-item">
                <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-1.45-.388 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Easy returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="product-tabs">
          <div className="tab-nav">
            <button
              className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
              onClick={() => setSelectedTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${selectedTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setSelectedTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${selectedTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setSelectedTab('reviews')}
            >
              Reviews ({product.reviews.count})
            </button>
          </div>

          <div className="tab-content">
            {selectedTab === 'description' && (
              <div className="description-content">
                <p>{product.description}</p>
                <p>Perfect for music lovers who demand the best audio experience. These headphones combine cutting-edge technology with premium materials to deliver exceptional sound quality and comfort.</p>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div className="specifications-content">
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-overview">
                  <div className="rating-summary">
                    <div className="average-rating">
                      <span className="rating-number">{product.reviews.average}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`star ${i < Math.floor(product.reviews.average) ? 'filled' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="total-reviews">{product.reviews.count} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2 className="section-title">You might also like</h2>
          <div className="related-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="related-product">
                <img src={relatedProduct.image} alt={relatedProduct.title} />
                <h3>{relatedProduct.title}</h3>
                <span className="price">${relatedProduct.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
