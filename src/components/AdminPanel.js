import React, { useState } from 'react';

const AdminPanel = ({ products: initialProducts, categories, onClose, onUpdateProducts }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
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
                <h3>Low Stock Alert</h3>
                <div className="table-content">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.filter(p => p.stock > 0 && p.stock < 10).slice(0, 5).map(product => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>
                            <button 
                              onClick={() => updateStock(product.id, product.stock + 50)}
                              className="btn btn-primary"
                            >
                              Restock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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