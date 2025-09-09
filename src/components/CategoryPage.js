import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

const CategoryPage = ({ products, categories, onAddToCart }) => {
  const { categoryName } = useParams();
  const categoryProducts = products.filter(p => p.category === categoryName);
  
  
  const categoryDescriptions = {
    "Dry Fruits": "Discover our premium selection of dry fruits, carefully sourced and packed with nutrients. From almonds to walnuts, we offer the finest quality dry fruits for your healthy lifestyle.",
    "Healthy Snacks": "Explore our range of nutritious snacks that are perfect for on-the-go energy. Our healthy snacks are made with natural ingredients and no artificial preservatives.",
    "Coconut Products": "Enjoy the goodness of coconut in various forms. From fresh coconut to coconut oil, we offer pure and natural coconut products for cooking and wellness.",
    "Gift Boxes & Combos": "Find the perfect gift for your loved ones with our beautifully curated gift boxes and combos. Perfect for festivals, celebrations, or corporate gifting.",
    "Seasonal Specials": "Check out our limited-time seasonal offerings. These special products are available for a short period and make perfect gifts or treats for yourself."
  };

  return (
    <div className="container" style={{padding: '2rem 0'}}>
      {}
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          <span style={{marginRight: '0.3rem'}}>🏠</span> Home
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{categoryName}</span>
      </nav>
      
      <h1 className="section-title">{categoryName}</h1>
      <div className="section-divider"></div>
      
      {categoryDescriptions[categoryName] && (
        <p className="category-description">
          {categoryDescriptions[categoryName]}
        </p>
      )}
      
      {categoryProducts.length > 0 ? (
        <ProductGrid products={categoryProducts} onAddToCart={onAddToCart} />
      ) : (
        <div className="no-products">
          <div className="no-products-icon">😔</div>
          <h3>No products found in this category</h3>
          <p>Check out our other categories for delicious dry fruits and snacks</p>
          <div className="category-suggestions">
            {categories.filter(cat => cat.name !== categoryName).slice(0, 3).map(category => (
              <Link 
                key={category.name} 
                to={`/category/${category.name}`}
                className="btn btn-primary"
              >
                Explore {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;