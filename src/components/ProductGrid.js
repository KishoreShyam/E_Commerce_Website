import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, title, onAddToCart }) => {
  return (
    <section className="product-grid">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="products">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-image" />
              </Link>
              {product.stock < 10 && product.stock > 0 && (
                <div className="product-badge">Low Stock</div>
              )}
              {product.stock === 0 && (
                <div className="product-badge out-of-stock-badge">Out of Stock</div>
              )}
              <div className="product-info">
                <Link to={`/product/${product.id}`}>
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-price">
                  <span className="original-price">₹{product.price}</span>
                  <span className="discount-price">₹{product.discountPrice}</span>
                </div>
                <div className="product-weight">{product.weight}</div>
                <div className="product-rating">
                  <span className="stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
                  <span className="review-count">({product.reviews})</span>
                </div>
                <div className="product-stock">
                  {product.inStock && product.stock > 0 ? (
                    product.stock < 10 ? (
                      <span className="low-stock">Only {product.stock} left in stock!</span>
                    ) : (
                      <span className="in-stock">In stock</span>
                    )
                  ) : (
                    <span className="out-of-stock">Out of stock</span>
                  )}
                </div>
                <button 
                  className={`add-to-cart-btn ${!product.inStock || product.stock === 0 ? 'disabled' : ''}`}
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock || product.stock === 0}
                >
                  {!product.inStock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;