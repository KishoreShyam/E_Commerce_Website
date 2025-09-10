import React, { useState } from 'react';

const AdminPanel = ({ 
  products: initialProducts, 
  categories, 
  orders: initialOrders = [], 
  customers: initialCustomers = [], 
  onClose, 
  onUpdateProducts,
  onUpdateOrderStatus,
  onUpdatePaymentStatus 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Dry Fruits',
    subcategory: 'Almonds',
    price: 0,
    discountPrice: 0,
    weight: '100g',
    image: '',
    rating: 0,
    reviews: 0,
    description: '',
    features: [],
    stock: 0,
    inStock: true
  });

  const addProduct = () => {
    const product = {
      ...newProduct,
      id: Date.now(),
      features: newProduct.features.split(',').map(f => f.trim()),
      stock: parseInt(newProduct.stock),
      inStock: parseInt(newProduct.stock) > 0
    };
    
    setProducts([...products, product]);
    if (onUpdateProducts) onUpdateProducts([...products, product]);
    
    
    setNewProduct({
      name: '',
      category: 'Dry Fruits',
      subcategory: 'Almonds',
      price: 0,
      discountPrice: 0,
      weight: '100g',
      image: '',
      rating: 0,
      reviews: 0,
      description: '',
      features: [],
      stock: 0,
      inStock: true
    });
  };

  const updateProduct = () => {
    const updatedProducts = products.map(p => 
      p.id === editingProduct.id ? {...editingProduct, features: editingProduct.features} : p
    );
    
    setProducts(updatedProducts);
    if (onUpdateProducts) onUpdateProducts(updatedProducts);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    if (onUpdateProducts) onUpdateProducts(updatedProducts);
  };

  const updateStock = (id, newStock) => {
    const updatedProducts = products.map(p => 
      p.id === id ? {...p, stock: parseInt(newStock), inStock: parseInt(newStock) > 0} : p
    );
    
    setProducts(updatedProducts);
    if (onUpdateProducts) onUpdateProducts(updatedProducts);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus);
    }
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
    );
    setOrders(updatedOrders);
    if (onUpdatePaymentStatus) {
      onUpdatePaymentStatus(orderId, newPaymentStatus);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#007bff';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={onClose} className="btn btn-primary">Close Admin</button>
      </div>
      <div className="admin-content">
        <div className="admin-tabs">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            Product Management
          </button>
          <button 
            className={activeTab === 'add-product' ? 'active' : ''} 
            onClick={() => setActiveTab('add-product')}
          >
            Add Product
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            Order Management
          </button>
          <button 
            className={activeTab === 'customers' ? 'active' : ''} 
            onClick={() => setActiveTab('customers')}
          >
            Customer Management
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div>
            <h3>Performance Dashboard</h3>
            <div className="admin-stats">
              <div className="stat-card">
                <h4>Total Products</h4>
                <p className="stat-value">{products.length}</p>
              </div>
              <div className="stat-card">
                <h4>Total Categories</h4>
                <p className="stat-value">{categories.length}</p>
              </div>
              <div className="stat-card">
                <h4>Out of Stock</h4>
                <p className="stat-value">{products.filter(p => !p.inStock).length}</p>
              </div>
              <div className="stat-card">
                <h4>Low Stock (&lt;10)</h4>
                <p className="stat-value">{products.filter(p => p.stock > 0 && p.stock < 10).length}</p>
              </div>
              <div className="stat-card">
                <h4>Total Orders</h4>
                <p className="stat-value">{orders.length}</p>
              </div>
              <div className="stat-card">
                <h4>Total Customers</h4>
                <p className="stat-value">{customers.length}</p>
              </div>
              <div className="stat-card">
                <h4>Pending Orders</h4>
                <p className="stat-value">{orders.filter(o => o.status === 'pending').length}</p>
              </div>
              <div className="stat-card">
                <h4>Total Revenue</h4>
                <p className="stat-value">₹{orders.reduce((sum, order) => sum + order.total, 0)}</p>
              </div>
            </div>

            <div className="admin-tables">
              <div className="admin-table">
                <h3>Best Selling Products</h3>
                <div className="table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map(product => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{Math.floor(Math.random() * 100)}</td>
                          <td>₹{Math.floor(Math.random() * 10000)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="admin-table">
                <h3>Recent Orders</h3>
                <div className="table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.customerName}</td>
                          <td>₹{order.total}</td>
                          <td>
                            <span style={{
                              color: getStatusColor(order.status),
                              fontWeight: 'bold',
                              textTransform: 'capitalize'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td>{formatDate(order.orderDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h3>Order Management</h3>
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        <div>
                          <strong>{order.customerName}</strong><br/>
                          <small>{order.customerEmail}</small>
                        </div>
                      </td>
                      <td>{order.items.length} item(s)</td>
                      <td>₹{order.total}</td>
                      <td>
                        <div>
                          <span style={{textTransform: 'capitalize'}}>{order.paymentMethod}</span><br/>
                          <small style={{
                            color: order.paymentStatus === 'completed' ? '#28a745' : '#ffc107'
                          }}>
                            {order.paymentStatus}
                          </small>
                        </div>
                      </td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            color: getStatusColor(order.status),
                            fontWeight: 'bold',
                            border: '1px solid #ddd',
                            padding: '0.3rem',
                            borderRadius: '4px'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>{formatDate(order.orderDate)}</td>
                      <td>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="btn btn-primary"
                          style={{marginRight: '0.5rem'}}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h3>Customer Management</h3>
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Total Orders</th>
                    <th>Total Spent</th>
                    <th>Status</th>
                    <th>Last Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.totalOrders}</td>
                      <td>₹{customer.totalSpent}</td>
                      <td>
                        <span style={{
                          color: customer.status === 'active' ? '#28a745' : '#6c757d',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {customer.status}
                        </span>
                      </td>
                      <td>{formatDate(customer.lastOrderDate)}</td>
                      <td>
                        <button 
                          onClick={() => setSelectedCustomer(customer)}
                          className="btn btn-primary"
                          style={{marginRight: '0.5rem'}}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'products' && (
          <div>
            <h3>Product Management</h3>
            <div className="table-content">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.image} alt={product.name} style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.discountPrice}</td>
                      <td>
                        <input 
                          type="number" 
                          value={product.stock || 0} 
                          onChange={(e) => updateStock(product.id, e.target.value)}
                          min="0"
                          style={{width: '60px'}}
                        />
                      </td>
                      <td>
                        <span className={product.inStock ? 'status-in-stock' : 'status-out-of-stock'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="btn btn-outline"
                          style={{marginLeft: '0.5rem'}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'add-product' && (
          <div>
            <h3>Add New Product</h3>
            <div className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="Enter price"
                  />
                </div>
                <div className="form-group">
                  <label>Discount Price (₹)</label>
                  <input 
                    type="number" 
                    value={newProduct.discountPrice}
                    onChange={(e) => setNewProduct({...newProduct, discountPrice: e.target.value})}
                    placeholder="Enter discount price"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weight</label>
                  <input 
                    type="text" 
                    value={newProduct.weight}
                    onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                    placeholder="e.g., 500g"
                  />
                </div>
                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="Enter stock quantity"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Features (comma separated)</label>
                <input 
                  type="text" 
                  value={newProduct.features}
                  onChange={(e) => setNewProduct({...newProduct, features: e.target.value})}
                  placeholder="e.g., Organic, Premium Grade, No additives"
                />
              </div>

              <button onClick={addProduct} className="btn btn-primary">
                Add Product
              </button>
            </div>
          </div>
        )}

        {selectedOrder && (
          <div className="modal-overlay">
            <div className="modal-content" style={{maxWidth: '800px', maxHeight: '90vh', overflow: 'auto'}}>
              <button className="close-modal" onClick={() => setSelectedOrder(null)}>×</button>
              <h3>Order Details - {selectedOrder.id}</h3>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem'}}>
                <div>
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <h4>Order Information</h4>
                  <p><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> 
                    <select 
                      value={selectedOrder.paymentStatus}
                      onChange={(e) => updatePaymentStatus(selectedOrder.id, e.target.value)}
                      style={{marginLeft: '0.5rem', padding: '0.2rem'}}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </p>
                  <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
                </div>
              </div>

              <div style={{marginBottom: '2rem'}}>
                <h4>Shipping Address</h4>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.zipCode}</p>
              </div>

              <div style={{marginBottom: '2rem'}}>
                <h4>Order Items</h4>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{borderBottom: '1px solid #ddd'}}>
                      <th style={{textAlign: 'left', padding: '0.5rem'}}>Product</th>
                      <th style={{textAlign: 'center', padding: '0.5rem'}}>Quantity</th>
                      <th style={{textAlign: 'right', padding: '0.5rem'}}>Price</th>
                      <th style={{textAlign: 'right', padding: '0.5rem'}}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map(item => (
                      <tr key={item.id} style={{borderBottom: '1px solid #eee'}}>
                        <td style={{padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          <img src={item.image} alt={item.name} style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                          {item.name}
                        </td>
                        <td style={{textAlign: 'center', padding: '0.5rem'}}>{item.quantity}</td>
                        <td style={{textAlign: 'right', padding: '0.5rem'}}>₹{item.price}</td>
                        <td style={{textAlign: 'right', padding: '0.5rem'}}>₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{borderTop: '2px solid #ddd', fontWeight: 'bold'}}>
                      <td colSpan="3" style={{textAlign: 'right', padding: '0.5rem'}}>Total:</td>
                      <td style={{textAlign: 'right', padding: '0.5rem'}}>₹{selectedOrder.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                  className="btn btn-primary"
                  disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                >
                  Mark as Processing
                </button>
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                  className="btn btn-primary"
                  disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                >
                  Mark as Shipped
                </button>
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                  className="btn btn-primary"
                  disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedCustomer && (
          <div className="modal-overlay">
            <div className="modal-content" style={{maxWidth: '700px', maxHeight: '90vh', overflow: 'auto'}}>
              <button className="close-modal" onClick={() => setSelectedCustomer(null)}>×</button>
              <h3>Customer Profile - {selectedCustomer.name}</h3>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem'}}>
                <div>
                  <h4>Personal Information</h4>
                  <p><strong>Customer ID:</strong> {selectedCustomer.id}</p>
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                  <p><strong>Join Date:</strong> {formatDate(selectedCustomer.joinDate)}</p>
                </div>
                <div>
                  <h4>Order Statistics</h4>
                  <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                  <p><strong>Total Spent:</strong> ₹{selectedCustomer.totalSpent}</p>
                  <p><strong>Average Order Value:</strong> ₹{Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)}</p>
                  <p><strong>Last Order:</strong> {formatDate(selectedCustomer.lastOrderDate)}</p>
                  <p><strong>Status:</strong> 
                    <span style={{
                      color: selectedCustomer.status === 'active' ? '#28a745' : '#6c757d',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      marginLeft: '0.5rem'
                    }}>
                      {selectedCustomer.status}
                    </span>
                  </p>
                </div>
              </div>

              <div style={{marginBottom: '2rem'}}>
                <h4>Customer Orders</h4>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{borderBottom: '1px solid #ddd'}}>
                      <th style={{textAlign: 'left', padding: '0.5rem'}}>Order ID</th>
                      <th style={{textAlign: 'center', padding: '0.5rem'}}>Date</th>
                      <th style={{textAlign: 'center', padding: '0.5rem'}}>Status</th>
                      <th style={{textAlign: 'right', padding: '0.5rem'}}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(order => order.customerId === selectedCustomer.id).map(order => (
                      <tr key={order.id} style={{borderBottom: '1px solid #eee'}}>
                        <td style={{padding: '0.5rem'}}>{order.id}</td>
                        <td style={{textAlign: 'center', padding: '0.5rem'}}>{formatDate(order.orderDate)}</td>
                        <td style={{textAlign: 'center', padding: '0.5rem'}}>
                          <span style={{
                            color: getStatusColor(order.status),
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{textAlign: 'right', padding: '0.5rem'}}>₹{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button 
                  onClick={() => {
                    const customerOrders = orders.filter(order => order.customerId === selectedCustomer.id);
                    if (customerOrders.length > 0) {
                      setSelectedOrder(customerOrders[0]);
                      setSelectedCustomer(null);
                    }
                  }}
                  className="btn btn-primary"
                >
                  View Latest Order
                </button>
                <button 
                  onClick={() => {
                    // In a real app, this would send an email
                    alert(`Email sent to ${selectedCustomer.email}`);
                  }}
                  className="btn btn-outline"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}

        {editingProduct && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={() => setEditingProduct(null)}>×</button>
              <h3>Edit Product</h3>
              
              <div className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input 
                      type="text" 
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select 
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input 
                      type="number" 
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount Price (₹)</label>
                    <input 
                      type="number" 
                      value={editingProduct.discountPrice}
                      onChange={(e) => setEditingProduct({...editingProduct, discountPrice: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input 
                    type="text" 
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows="3"
                  />
                </div>

                <button onClick={updateProduct} className="btn btn-primary">
                  Update Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;