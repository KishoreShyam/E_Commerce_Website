import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ categories }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              {categories.map(category => (
                <li key={category.name}>
                  <Link to={`/category/${category.name}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns & Refunds</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/quality">Quality Promise</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {currentYear} DryFruits Delight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
