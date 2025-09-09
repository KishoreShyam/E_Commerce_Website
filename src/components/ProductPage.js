import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = ({ products, onAddToCart, user }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="product-detail">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <div className="product-price">
            <span className="original-price">₹{product.price}</span>
            <span className="discount-price">₹{product.discountPrice}</span>
          </div>
          <div className="product-rating">
            <span className="stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
            <span className="review-count">({product.reviews} reviews)</span>
          </div>
          <div className="product-stock">
            {product.inStock ? (
              product.stock < 10 ? (
                <span className="low-stock">Only {product.stock} left in stock!</span>
              ) : (
                <span className="in-stock">In stock</span>
              )
            ) : (
              <span className="out-of-stock">Out of stock</span>
            )}
          </div>
          <p className="product-description">{product.description}</p>
          
          <div className="product-features">
            <h3>Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <button 
            className={`add-to-cart-btn ${!product.inStock || product.stock === 0 ? 'disabled' : ''}`}
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock || product.stock === 0}
          >
            {!product.inStock || product.stock === 0 ? 'Out of Stock' : 'Add to Cart - ₹' + product.discountPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
