import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay in the loop</h2>
            <p className="newsletter-subtitle">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </div>
              <p className="newsletter-disclaimer">
                No spam, unsubscribe at any time
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section">
              <Link to="/" className="footer-logo">
                <div className="footer-logo-icon">
                  <span>SC</span>
                </div>
                <span className="footer-logo-text">Shohoj Cart</span>
              </Link>
              <p className="footer-description">
                Your trusted e-commerce partner for premium products.
                We bring quality and convenience to your doorstep.
              </p>
              <div className="social-links">
                <a href="#" className="social-link facebook" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link twitter" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-link instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.229 14.794 3.8 13.644 3.8 12.347s.429-2.447 1.326-3.324c.875-.807 2.026-1.297 3.323-1.297s2.447.49 3.323 1.297c.897.877 1.297 2.027 1.297 3.324s-.4 2.447-1.297 3.324c-.876.807-2.026 1.297-3.323 1.297zm7.138 0c-1.297 0-2.448-.49-3.324-1.297-.897-.877-1.297-2.027-1.297-3.324s.4-2.447 1.297-3.324c.876-.807 2.027-1.297 3.324-1.297s2.447.49 3.323 1.297c.897.877 1.297 2.027 1.297 3.324s-.4 2.447-1.297 3.324c-.876.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="social-link youtube" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                <li><Link to="/shipping" className="footer-link">Shipping Info</Link></li>
                <li><Link to="/returns" className="footer-link">Returns</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3 className="footer-heading">Categories</h3>
              <ul className="footer-links">
                <li><Link to="/collections/electronics" className="footer-link">Electronics</Link></li>
                <li><Link to="/collections/fashion" className="footer-link">Fashion</Link></li>
                <li><Link to="/collections/home" className="footer-link">Home & Living</Link></li>
                <li><Link to="/collections/sports" className="footer-link">Sports</Link></li>
                <li><Link to="/collections/books" className="footer-link">Books</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h3 className="footer-heading">Customer Service</h3>
              <ul className="footer-links">
                <li><Link to="/support" className="footer-link">Help Center</Link></li>
                <li><Link to="/track-order" className="footer-link">Track Your Order</Link></li>
                <li><Link to="/size-guide" className="footer-link">Size Guide</Link></li>
                <li><Link to="/gift-cards" className="footer-link">Gift Cards</Link></li>
                <li><Link to="/wholesale" className="footer-link">Wholesale</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-heading">Get in Touch</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <p>123 Commerce Street</p>
                    <p>Dhaka 1000, Bangladesh</p>
                  </div>
                </div>
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <div>
                    <p>+880 123 456 7890</p>
                    <p>Mon-Fri 9AM-6PM</p>
                  </div>
                </div>
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <div>
                    <p>support@shohojcart.com</p>
                    <p>We reply within 24hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p>&copy; {currentYear} Shohoj Cart. All rights reserved.</p>
              <div className="footer-bottom-links">
                <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
                <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
                <Link to="/cookies" className="footer-bottom-link">Cookie Policy</Link>
              </div>
            </div>
            <div className="footer-bottom-right">
              <span className="payment-text">We accept:</span>
              <div className="payment-methods">
                <div className="payment-method">VISA</div>
                <div className="payment-method">MC</div>
                <div className="payment-method">AMEX</div>
                <div className="payment-method">PP</div>
                <div className="payment-method">bKash</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
