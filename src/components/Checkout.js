import React, { useState } from 'react';

const Checkout = ({ cartItems, user, onLogin }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({});

  if (!user) {
    return (
      <div className="container" style={{padding: '2rem 0', minHeight: '50vh', textAlign: 'center'}}>
        <h2>Checkout</h2>
        <div style={{background: '#f8f9fa', padding: '2rem', borderRadius: '8px', margin: '2rem 0'}}>
          <h3>Please login to proceed with checkout</h3>
          <button onClick={onLogin} className="btn btn-primary" style={{marginTop: '1rem'}}>
            Login Now
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{padding: '2rem 0', minHeight: '50vh', textAlign: 'center'}}>
        <h2>Checkout</h2>
        <div style={{background: '#f8f9fa', padding: '2rem', borderRadius: '8px', margin: '2rem 0'}}>
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart before checking out</p>
        </div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
  const shippingCost = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + shippingCost;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate order processing
      setOrderPlaced(true);
      
      // In a real app, you would send this data to your backend
      const orderData = {
        user: user,
        items: cartItems,
        shippingAddress: formData,
        total: finalTotal,
        orderDate: new Date().toISOString(),
        orderId: `ORD${Date.now()}`
      };
      
      console.log('Order placed:', orderData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (orderPlaced) {
    return (
      <div className="container" style={{padding: '2rem 0', minHeight: '50vh', textAlign: 'center'}}>
        <div style={{background: '#d4edda', padding: '2rem', borderRadius: '8px', margin: '2rem 0'}}>
          <h2 style={{color: '#155724'}}>🎉 Order Placed Successfully!</h2>
          <p>Your order has been confirmed. You will receive a confirmation email shortly.</p>
          <p><strong>Order ID:</strong> ORD{Date.now()}</p>
          <p><strong>Total Amount:</strong> ₹{finalTotal}</p>
          <p><strong>Shipping Address:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.zipCode}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{padding: '2rem 0'}}>
      <h2 className="section-title">Checkout</h2>
      
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="10-digit number"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
                rows="3"
                placeholder="Full street address"
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method *</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order - ₹{finalTotal}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h3>Order Summary</h3>
          <div className="order-summary">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.discountPrice} × {item.quantity}</p>
                </div>
                <div className="order-item-total">
                  ₹{item.discountPrice * item.quantity}
                </div>
              </div>
            ))}
            
            <div className="order-totals">
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-line">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              {totalPrice < 500 && (
                <div className="shipping-note">
                  Add ₹{500 - totalPrice} more for free shipping!
                </div>
              )}
              <div className="summary-line total">
                <span>Total:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
