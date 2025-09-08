import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItems, user, onLogin, onLogout, onSearch, categories }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header>
      <div className="header-top">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>
        
        <Link to="/" className="logo">
          <span className="logo-icon">🥜</span>
          DryFruits Delight
        </Link>
        
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search for products..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="user-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hello, {user.name}</span>
              <div className="user-dropdown">
                <button onClick={onLogout} className="logout-btn">Logout</button>
                {user.email === "admin@dryfruits.com" && (
                  <Link to="/admin" className="admin-link">Admin Panel</Link>
                )}
              </div>
            </div>
          ) : (
            <button onClick={onLogin} className="btn btn-primary">Login</button>
          )}
          
          <Link to="/cart" className="cart-icon">
            🛒
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </Link>
        </div>
      </div>
      
      <nav className={showMobileMenu ? "mobile-nav-open" : ""}>
        <ul className="nav-menu">
          {categories.map(category => (
            <li key={category.name}>
              <Link to={`/category/${category.name}`} onClick={() => setShowMobileMenu(false)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="nav-features">
          <div className="nav-feature">
            <span>🚚</span>
            Free shipping above ₹500
          </div>
          <div className="nav-feature">
            <span>🌿</span>
            100% Natural
          </div>
          <div className="nav-feature">
            <span>⭐</span>
            Fresh guarantee
          </div>
        </div>
      </nav>
      
      {showMobileMenu && (
        <div className="mobile-overlay" onClick={() => setShowMobileMenu(false)}></div>
      )}
    </header>
  );
};

export default Header;