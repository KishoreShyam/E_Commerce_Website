import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Almonds",
      category: "Dry Fruits",
      subcategory: "Almonds",
      price: 399,
      discountPrice: 299,
      weight: "500g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.5,
      reviews: 128,
      description: "Premium quality California almonds, rich in protein and healthy fats. Perfect for snacking or cooking.",
      features: ["100% Natural", "Rich in Protein", "Heart Healthy", "Premium Grade"],
      stock: 50,
      inStock: true
    },
    {
      id: 2,
      name: "Cashew Nuts",
      category: "Dry Fruits",
      subcategory: "Cashews",
      price: 499,
      discountPrice: 399,
      weight: "500g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.3,
      reviews: 95,
      description: "Creamy and delicious cashew nuts sourced from the finest farms. Rich in minerals and vitamins.",
      features: ["Premium Quality", "Rich in Minerals", "Creamy Texture", "Fresh & Crunchy"],
      stock: 30,
      inStock: true
    },
    {
      id: 3,
      name: "Mixed Dry Fruits",
      category: "Dry Fruits",
      subcategory: "Mixed",
      price: 699,
      discountPrice: 599,
      weight: "1kg",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.7,
      reviews: 203,
      description: "A perfect blend of almonds, cashews, raisins, and walnuts. Ideal for gifting or daily consumption.",
      features: ["Premium Mix", "Gift Ready", "Nutritious Blend", "Value Pack"],
      stock: 25,
      inStock: true
    },
    {
      id: 4,
      name: "Walnuts",
      category: "Dry Fruits",
      subcategory: "Walnuts",
      price: 349,
      discountPrice: 249,
      weight: "250g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.2,
      reviews: 87,
      description: "Fresh Kashmir walnuts with excellent taste and nutritional value. Great for brain health.",
      features: ["Kashmir Origin", "Brain Food", "Omega-3 Rich", "Fresh Harvest"],
      stock: 40,
      inStock: true
    },
    {
      id: 5,
      name: "Dates (Khajoor)",
      category: "Dry Fruits",
      subcategory: "Dates",
      price: 299,
      discountPrice: 199,
      weight: "500g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.6,
      reviews: 156,
      description: "Sweet and nutritious dates packed with natural energy. Perfect for breaking fasts or as a healthy snack.",
      features: ["Natural Sweetener", "Energy Booster", "High Fiber", "No Added Sugar"],
      stock: 60,
      inStock: true
    },
    {
      id: 6,
      name: "Trail Mix",
      category: "Healthy Snacks",
      subcategory: "Mixed Snacks",
      price: 249,
      discountPrice: 199,
      weight: "200g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.4,
      reviews: 112,
      description: "Perfect blend of nuts, seeds, and dried fruits for on-the-go energy. Great for hiking and workouts.",
      features: ["Energy Boost", "Portable", "Protein Rich", "No Preservatives"],
      stock: 35,
      inStock: true
    },
    {
      id: 7,
      name: "Roasted Peanuts",
      category: "Healthy Snacks",
      subcategory: "Peanuts",
      price: 149,
      discountPrice: 99,
      weight: "400g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.1,
      reviews: 89,
      description: "Crunchy roasted peanuts with a perfect balance of salt and flavor. Great for evening snacks.",
      features: ["Roasted Fresh", "Lightly Salted", "Crunchy", "High Protein"],
      stock: 45,
      inStock: true
    },
    {
      id: 8,
      name: "Coconut Chips",
      category: "Coconut Products",
      subcategory: "Chips",
      price: 199,
      discountPrice: 149,
      weight: "150g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.3,
      reviews: 67,
      description: "Crispy coconut chips made from fresh coconuts. A healthy alternative to regular chips.",
      features: ["100% Natural", "Crispy Texture", "No Trans Fat", "Gluten Free"],
      stock: 20,
      inStock: true
    },
    {
      id: 9,
      name: "Premium Gift Box",
      category: "Gift Boxes & Combos",
      subcategory: "Premium",
      price: 1299,
      discountPrice: 999,
      weight: "1.5kg",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.8,
      reviews: 234,
      description: "Elegant gift box containing a premium selection of dry fruits and nuts. Perfect for festivals and celebrations.",
      features: ["Premium Packaging", "Variety Pack", "Gift Ready", "Festival Special"],
      stock: 15,
      inStock: true
    },
    {
      id: 10,
      name: "Festive Special Mix",
      category: "Seasonal Specials",
      subcategory: "Festival",
      price: 799,
      discountPrice: 649,
      weight: "800g",
      image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
      rating: 4.5,
      reviews: 145,
      description: "Special festive mix of premium dry fruits and sweets. Limited time offer for the festive season.",
      features: ["Limited Edition", "Festive Special", "Premium Mix", "Sweet & Savory"],
      stock: 0,
      inStock: false
    }
  ]);

  const [categories] = useState([
    { name: "Dry Fruits", icon: "🥜" },
    { name: "Healthy Snacks", icon: "🍿" },
    { name: "Coconut Products", icon: "🥥" },
    { name: "Gift Boxes & Combos", icon: "🎁" },
    { name: "Seasonal Specials", icon: "⭐" }
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // New state for dynamic order and customer management
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleAddToCart = (product) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    
    // Add customer to customers list if not exists
    const existingCustomer = customers.find(c => c.email === userData.email);
    if (!existingCustomer) {
      const newCustomer = {
        id: `CUST${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '+91 9876543210',
        joinDate: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        status: 'active',
        lastOrderDate: null
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleUpdateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  // Function to handle order placement
  const handleOrderPlaced = (orderData) => {
    const orderId = `ORD${Date.now()}`;
    const newOrder = {
      id: orderId,
      customerId: orderData.user.email, // Using email as customer ID for simplicity
      customerName: orderData.user.name,
      customerEmail: orderData.user.email,
      customerPhone: orderData.shippingAddress.phone,
      items: orderData.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.discountPrice,
        image: item.image
      })),
      total: orderData.total,
      status: 'pending',
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'completed',
      orderDate: new Date().toISOString(),
      shippingAddress: {
        address: `${orderData.shippingAddress.address}`,
        city: orderData.shippingAddress.city,
        state: orderData.shippingAddress.state,
        zipCode: orderData.shippingAddress.zipCode
      },
      trackingNumber: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    // Add order to orders list
    setOrders(prev => [newOrder, ...prev]);

    // Update customer data
    setCustomers(prev => prev.map(customer => {
      if (customer.email === orderData.user.email) {
        return {
          ...customer,
          totalOrders: customer.totalOrders + 1,
          totalSpent: customer.totalSpent + orderData.total,
          lastOrderDate: new Date().toISOString(),
          status: 'active'
        };
      }
      return customer;
    }));

    // Update product stock
    setProducts(prev => prev.map(product => {
      const orderedItem = orderData.items.find(item => item.id === product.id);
      if (orderedItem) {
        const newStock = Math.max(0, product.stock - orderedItem.quantity);
        return {
          ...product,
          stock: newStock,
          inStock: newStock > 0
        };
      }
      return product;
    }));

    // Clear cart
    setCartItems([]);
  };

  // Function to update order status from admin panel
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Function to update payment status from admin panel
  const handleUpdatePaymentStatus = (orderId, newPaymentStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
    ));
  };

  return (
    <Router>
      <div className="App">
        <Header 
          cartItems={cartItems} 
          user={user} 
          onLogin={() => setShowLogin(true)}
          onLogout={handleLogout}
          onSearch={handleSearch}
          categories={categories}
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductGrid 
                products={filteredProducts.slice(0, 8)} 
                title="Featured Products" 
                onAddToCart={handleAddToCart}
              />
            </>
          } />
          <Route path="/product/:id" element={
            <ProductPage 
              products={products} 
              onAddToCart={handleAddToCart}
              user={user}
            />
          } />
          <Route path="/category/:categoryName" element={
            <CategoryPage 
              products={filteredProducts} 
              categories={categories}
              onAddToCart={handleAddToCart}
            />
          } />
          <Route path="/cart" element={
            <Cart 
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              user={user}
              onLogin={() => setShowLogin(true)}
            />
          } />
          <Route path="/checkout" element={
            <Checkout 
              cartItems={cartItems}
              user={user}
              onLogin={() => setShowLogin(true)}
              onOrderPlaced={handleOrderPlaced}
            />
          } />
          <Route path="/admin" element={
            user && user.email === "admin@dryfruits.com" ? (
              <AdminPanel 
                products={products}
                categories={categories}
                orders={orders}
                customers={customers}
                onClose={() => setShowAdmin(false)}
                onUpdateProducts={handleUpdateProducts}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdatePaymentStatus={handleUpdatePaymentStatus}
              />
            ) : (
              <Navigate to="/" />
            )
          } />
        </Routes>
        
        <Footer categories={categories} />
        
        {showLogin && (
          <LoginModal 
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;