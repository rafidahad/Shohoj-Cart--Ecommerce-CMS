import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Summer Collection 2025",
      subtitle: "Discover the latest trends",
      description: "Shop our newest arrivals and get up to 50% off selected items",
      image: "/api/placeholder/1200/600",
      buttonText: "Shop Now",
      buttonLink: "/collections/summer"
    },
    {
      id: 2,
      title: "Premium Electronics",
      subtitle: "Technology that inspires",
      description: "Cutting-edge gadgets and electronics for the modern lifestyle",
      image: "/api/placeholder/1200/600",
      buttonText: "Explore Tech",
      buttonLink: "/collections/electronics"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "/api/placeholder/300/300",
      badge: "Best Seller",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: "/api/placeholder/300/300",
      badge: "New",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      title: "Premium Coffee Maker",
      price: 149.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 234
    },
    {
      id: 4,
      title: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "/api/placeholder/300/300",
      badge: "Sale",
      rating: 4.6,
      reviews: 67
    }
  ];

  const collections = [
    {
      id: 1,
      title: "Electronics",
      subtitle: "Latest Tech",
      image: "/api/placeholder/400/500",
      link: "/collections/electronics"
    },
    {
      id: 2,
      title: "Fashion",
      subtitle: "Trending Styles",
      image: "/api/placeholder/400/500",
      link: "/collections/fashion"
    },
    {
      id: 3,
      title: "Home & Living",
      subtitle: "Comfort Essentials",
      image: "/api/placeholder/400/500",
      link: "/collections/home"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-image">
                <img src={slide.image} alt={slide.title} />
                <div className="hero-overlay"></div>
              </div>
              <div className="hero-content">
                <div className="hero-text">
                  <span className="hero-subtitle">{slide.subtitle}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-description">{slide.description}</p>
                  <Link to={slide.buttonLink} className="hero-button">
                    {slide.buttonText}
                    <svg className="button-arrow" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation */}
          <button className="hero-nav prev" onClick={prevSlide}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="hero-nav next" onClick={nextSlide}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="collections-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Discover our curated collections</p>
          </div>
          <div className="collections-grid">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={collection.link}
                className="collection-card"
              >
                <div className="collection-image">
                  <img src={collection.image} alt={collection.title} />
                  <div className="collection-overlay">
                    <div className="collection-content">
                      <h3 className="collection-title">{collection.title}</h3>
                      <span className="collection-subtitle">{collection.subtitle}</span>
                      <span className="collection-cta">Shop Collection</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked favorites just for you</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.badge && (
                  <span className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                    {product.badge}
                  </span>
                )}
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                    <div className="product-actions">
                      <button className="quick-view-btn">Quick View</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="rating-text">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
                <button className="add-to-cart-btn">
                  <svg className="cart-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/products" className="view-all-btn">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay in the Loop</h2>
            <p className="newsletter-subtitle">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
            <p className="newsletter-disclaimer">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </div>
              <h3 className="feature-title">Fast Shipping</h3>
              <p className="feature-description">Free shipping on orders over $50</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="feature-title">Secure Payment</h3>
              <p className="feature-description">Your payment information is safe</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-1.45-.388 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="feature-title">Easy Returns</h3>
              <p className="feature-description">30-day return policy</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.678 3.348-3.97z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Get help when you need it</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
