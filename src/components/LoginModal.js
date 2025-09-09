import React, { useState } from 'react';

const LoginModal = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) {
      onLogin({
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        isAdmin: email === 'admin@dryfruits.com'
      });
    }
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <h2 className="modal-title">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
              Login
            </button>
            <button type="button" className="btn btn-outline" style={{width: '100%'}}>
              Create Account
            </button>
          </div>
        </form>
        <div className="admin-note">
          <p><strong>Admin Access:</strong> Use admin@dryfruits.com with any password</p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;