import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    bankName: ''
  });

  const [errors, setErrors] = useState({});

  // Show relevant fields based on payment method
  const showCardDetails = formData.paymentMethod === 'card';
  const showUPIDetails = formData.paymentMethod === 'upi';
  const showNetBankingDetails = formData.paymentMethod === 'netbanking';

  useEffect(() => {
    // Clear payment-specific errors when payment method changes
    const paymentFields = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv', 'upiId', 'bankName'];
    setErrors(prev => {
      const newErrors = { ...prev };
      paymentFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  }, [formData.paymentMethod]);

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
          <Link to="/" className="btn btn-primary" style={{marginTop: '1rem'}}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
  const shippingCost = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + shippingCost;

  const validateForm = () => {
    const newErrors = {};
    
    // Personal information validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Payment method specific validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required';

      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }

      if (formData.cardExpiry && !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Use format MM/YY';
      }

      if (formData.cardCvv && !/^\d{3,4}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = 'CVV must be 3-4 digits';
      }
    }
    else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
      if (formData.upiId && !/[\w.-]+@[\w]+/.test(formData.upiId)) {
        newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi)';
      }
    }
    else if (formData.paymentMethod === 'netbanking') {
      if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
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
        paymentMethod: formData.paymentMethod,
        total: finalTotal,
        orderDate: new Date().toISOString(),
        orderId: `ORD${Date.now()}`
      };
      
      console.log('Order placed:', orderData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
    // Format expiry date
    else if (name === 'cardExpiry') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
          <p><strong>Payment Method:</strong> {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 
            formData.paymentMethod === 'upi' ? 'UPI' : 
            formData.paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery'}</p>
          <p><strong>Shipping Address:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.zipCode}</p>
        </div>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
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
            {/* Personal information fields (same as before) */}
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
                  placeholder="Enter your first name"
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
                  placeholder="Enter your last name"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your city"
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
                  placeholder="Enter your state"
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
                  placeholder="Enter zip code"
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

            {/* Card Details Section - Only shown when payment method is card */}
            {showCardDetails && (
              <div className="payment-details-section">
                <h4>Card Details</h4>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={errors.cardNumber ? 'error' : ''}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardName">Cardholder Name *</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'error' : ''}
                    placeholder="Name on card"
                  />
                  {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry Date *</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className={errors.cardExpiry ? 'error' : ''}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV *</label>
                    <input
                      type="text"
                      id="cardCvv"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className={errors.cardCvv ? 'error' : ''}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cardCvv && <span className="error-text">{errors.cardCvv}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* UPI Details Section - Only shown when payment method is UPI */}
            {showUPIDetails && (
              <div className="payment-details-section">
                <h4>UPI Details</h4>
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID *</label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className={errors.upiId ? 'error' : ''}
                    placeholder="yourname@upi"
                  />
                  {errors.upiId && <span className="error-text">{errors.upiId}</span>}
                </div>
                <p className="payment-note">You will be redirected to your UPI app for payment confirmation</p>
              </div>
            )}

            {/* Net Banking Details Section - Only shown when payment method is Net Banking */}
            {showNetBankingDetails && (
              <div className="payment-details-section">
                <h4>Net Banking Details</h4>
                <div className="form-group">
                  <label htmlFor="bankName">Bank Name *</label>
                  <select
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className={errors.bankName ? 'error' : ''}
                  >
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="yes">Yes Bank</option>
                  </select>
                  {errors.bankName && <span className="error-text">{errors.bankName}</span>}
                </div>
                <p className="payment-note">You will be redirected to your bank's website for payment</p>
              </div>
            )}

            {/* Cash on Delivery Note */}
            {formData.paymentMethod === 'cod' && (
              <div className="payment-details-section">
                <h4>Cash on Delivery</h4>
                <p className="payment-note">Please keep cash ready for when our delivery executive arrives. An additional ₹20 processing fee will be charged for COD orders.</p>
              </div>
            )}

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
