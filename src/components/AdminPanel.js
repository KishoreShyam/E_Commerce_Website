import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminPanel = ({ 
  products, 
  categories, 
  orders, 
  customers, 
  onClose, 
  onUpdateProducts, 
  onUpdateOrderStatus, 
  onUpdatePaymentStatus 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Order status distribution
  const orderStatusData = [
    { name: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#ffc107' },
    { name: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: '#17a2b8' },
    { name: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: '#007bff' },
    { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#28a745' },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, color: '#dc3545' }
  ];

  // Monthly revenue data (mock data for demo)
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: totalRevenue }
  ];

  const handleStatusUpdate = (orderId, newStatus) => {
    onUpdateOrderStatus(orderId, newStatus);
  };

  const handlePaymentStatusUpdate = (orderId, newPaymentStatus) => {
    onUpdatePaymentStatus(orderId, newPaymentStatus);
  };

  const CustomerDetailsModal = ({ customer, onClose }) => {
    const customerOrders = orders.filter(order => order.customerEmail === customer.email);
    const customerRevenue = customerOrders.reduce((sum, order) => sum + order.total, 0);

    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
          <button className="close-modal" onClick={onClose}>×</button>
          <h2>Customer Details</h2>
          
          <div className="customer-stats">
            <div className="customer-stat">
              <div className="customer-stat-value">{customerOrders.length}</div>
              <div className="customer-stat-label">Total Orders</div>
            </div>
            <div className="customer-stat">
              <div className="customer-stat-value">₹{customerRevenue.toLocaleString()}</div>
              <div className="customer-stat-label">Total Spent</div>
            </div>
            <div className="customer-stat">
              <div className="customer-stat-value">₹{customerOrders.length > 0 ? Math.round(customerRevenue / customerOrders.length) : 0}</div>
              <div className="customer-stat-label">Avg Order Value</div>
            </div>
            <div className="customer-stat">
              <div className="customer-stat-value">{customer.status}</div>
              <div className="customer-stat-label">Status</div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3>Customer Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <strong>Name:</strong> {customer.name}
              </div>
              <div>
                <strong>Email:</strong> {customer.email}
              </div>
              <div>
                <strong>Phone:</strong> {customer.phone}
              </div>
              <div>
                <strong>Join Date:</strong> {new Date(customer.joinDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Last Order:</strong> {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'}
              </div>
            </div>
          </div>

          <div>
            <h3>Order History</h3>
            {customerOrders.length > 0 ? (
              <div className="table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.items.length} items</td>
                        <td>₹{order.total}</td>
                        <td>
                          <span className={`order-status-badge status-${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.paymentStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No orders found for this customer.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const OrderDetailsModal = ({ order, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
          <button className="close-modal" onClick={onClose}>×</button>
          <h2>Order Details - {order.id}</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3>Customer Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><strong>Name:</strong> {order.customerName}</div>
              <div><strong>Email:</strong> {order.customerEmail}</div>
              <div><strong>Phone:</strong> {order.customerPhone}</div>
              <div><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3>Shipping Address</h3>
            <p>
              {order.shippingAddress.address}<br/>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3>Order Items</h3>
            {order.items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem' }} />
                <div style={{ flexGrow: 1 }}>
                  <div><strong>{item.name}</strong></div>
                  <div>Quantity: {item.quantity} × ₹{item.price}</div>
                </div>
                <div><strong>₹{item.quantity * item.price}</strong></div>
              </div>
            ))}
            <div style={{ textAlign: 'right', marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total: ₹{order.total}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3>Order Status</h3>
            <div className="order-timeline">
              <div className={`timeline-item ${['pending', 'processing', 'shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                Order Placed
              </div>
              <div className={`timeline-item ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                Processing
              </div>
              <div className={`timeline-item ${['shipped', 'delivered'].includes(order.status) ? 'active' : ''}`}>
                Shipped
              </div>
              <div className={`timeline-item ${order.status === 'delivered' ? 'active' : ''}`}>
                Delivered
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <select 
              value={order.status} 
              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select 
              value={order.paymentStatus} 
              onChange={(e) => handlePaymentStatusUpdate(order.id, e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="pending">Payment Pending</option>
              <option value="completed">Payment Completed</option>
              <option value="failed">Payment Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div>
      <div className="admin-stats">
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-label">All time</div>
        </div>
        <div className="stat-card">
          <h4>Total Orders</h4>
          <div className="stat-value">{totalOrders}</div>
          <div className="stat-label">All orders</div>
        </div>
        <div className="stat-card">
          <h4>Total Customers</h4>
          <div className="stat-value">{totalCustomers}</div>
          <div className="stat-label">Registered</div>
        </div>
        <div className="stat-card">
          <h4>Average Order Value</h4>
          <div className="stat-value">₹{Math.round(averageOrderValue)}</div>
          <div className="stat-label">Per order</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="admin-table">
          <h3>Monthly Revenue Trend</h3>
          <div className="table-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#F4A261" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-table">
          <h3>Order Status Distribution</h3>
          <div className="table-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="admin-table">
      <h3>Customer Management</h3>
      <div className="table-content">
        {customers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Status</th>
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
                  <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                  <td>{customer.totalOrders}</td>
                  <td>₹{customer.totalSpent.toLocaleString()}</td>
                  <td>{customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'}</td>
                  <td>
                    <span className={`status-${customer.status === 'active' ? 'in-stock' : 'out-of-stock'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No customers found. Customers will appear here when they place their first order.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="admin-table">
      <h3>Order Management</h3>
      <div className="table-content">
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div>
                      <div>{order.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>{order.customerEmail}</div>
                    </div>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.items.length} items</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`order-status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="admin-table">
      <h3>Product Management</h3>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>Product</th>
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
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <div>{product.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>{product.weight}</div>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>₹{product.discountPrice}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={onClose} className="btn btn-outline">
          Close Admin Panel
        </button>
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
            className={activeTab === 'customers' ? 'active' : ''} 
            onClick={() => setActiveTab('customers')}
          >
            Customers ({customers.length})
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            Orders ({orders.length})
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            Products ({products.length})
          </button>
        </div>
        
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'products' && renderProducts()}
      </div>

      {selectedCustomer && (
        <CustomerDetailsModal 
          customer={selectedCustomer} 
          onClose={() => setSelectedCustomer(null)} 
        />
      )}

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default AdminPanel;