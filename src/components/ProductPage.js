import React from 'react';

const ProductPage = ({ products, onAddToCart }) => {
  return (
    
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
  );
};

export default ProductPage;