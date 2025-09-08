import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, user, onLogin }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const totalPrice = cartItems.reduce((total, item) => total + (item.discountPrice * item.quantity), 0);
  const shippingCost = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + shippingCost;
  
  const handlePlaceOrder = () => {
    // Simulate order placement
    setShowPaymentModal(false);
    setOrderPlaced(true);
    
    // In a real app, you would send the order to your backend here
    setTimeout(() => {
      // Clear cart after successful order
      cartItems.forEach(item => onRemoveItem(item.id));
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="container" style={{padding: '2rem 0', minHeight: '50vh', textAlign: 'center'}}>
        <div style={{background: '#d4edda', padding: '2rem', borderRadius: '8px', margin: '2rem 0'}}>
          <h2 style={{color: '#155724'}}>🎉 Order Placed Successfully!</h2>
          <p>Your order has been confirmed. You will receive a confirmation email shortly.</p>
          <p>Order ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{padding: '2rem 0', minHeight: '50vh'}}>
      <h2 className="section-title">Shopping Cart</h2>
      
      {!user ? (
        <div style={{textAlign: 'center', padding: '3rem'}}>
          <h3>Please login to view your cart</h3>
          <button onClick={onLogin} className="btn btn-primary" style={{marginTop: '1rem'}}>
            Login Now
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem'}}>
          <h3>Your cart is empty</h3>
          <Link to="/" className="btn btn-primary" style={{marginTop: '1rem'}}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹{item.discountPrice} / {item.weight}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)} 
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ₹{item.discountPrice * item.quantity}
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
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
            
            <button 
              onClick={() => setShowPaymentModal(true)} 
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content payment-modal">
            <button className="close-modal" onClick={() => setShowPaymentModal(false)}>×</button>
            <h2>Payment Details</h2>
            
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>UPI</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Net Banking</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
            
            <div className="card-details">
              <h3>Card Details</h3>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div style={{display: 'flex', gap: '1rem'}}>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
            </div>
            
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Place Order - ₹{finalTotal}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;