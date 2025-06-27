import React, { useState, useRef } from 'react';

const AdminPanel = ({ menuItems, onUpdateMenu, onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: Object.keys(menuItems)[0]
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '',
    image: ''
  });
  const [uploadedImages, setUploadedImages] = useState({});
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleAddItem = () => {
    const updatedMenu = { ...menuItems };
    const newId = Math.max(...Object.values(updatedMenu).flatMap(cat => cat.items.map(item => item.id))) + 1;
    
    updatedMenu[newItem.category].items.push({
      ...newItem,
      id: newId,
      status: 'active'
    });
    
    onUpdateMenu(updatedMenu);
    setNewItem({
      name: '',
      price: '',
      description: '',
      image: '',
      category: Object.keys(menuItems)[0]
    });
    setShowAddForm(false);
  };

  const handleAddCategory = () => {
    const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, '');
    const updatedMenu = { ...menuItems };
    
    updatedMenu[categoryId] = {
      name: newCategory.name,
      icon: newCategory.icon,
      image: newCategory.image,
      items: []
    };
    
    onUpdateMenu(updatedMenu);
    setNewCategory({
      name: '',
      icon: '',
      image: ''
    });
    setShowAddCategoryForm(false);
  };

  const handleEditItem = () => {
    const updatedMenu = { ...menuItems };
    const category = updatedMenu[editingItem.category];
    const itemIndex = category.items.findIndex(item => item.id === editingItem.id);
    
    if (itemIndex !== -1) {
      category.items[itemIndex] = { ...editingItem };
      onUpdateMenu(updatedMenu);
    }
    
    setEditingItem(null);
  };

  const handleEditCategory = () => {
    const updatedMenu = { ...menuItems };
    const oldCategoryId = Object.keys(menuItems).find(key => menuItems[key] === editingCategory.originalData);
    
    if (oldCategoryId) {
      const categoryData = { ...editingCategory };
      delete categoryData.originalData;
      
      updatedMenu[oldCategoryId] = categoryData;
      onUpdateMenu(updatedMenu);
    }
    
    setEditingCategory(null);
  };

  const handleDeleteItem = (categoryId, itemId) => {
    const updatedMenu = { ...menuItems };
    updatedMenu[categoryId].items = updatedMenu[categoryId].items.filter(item => item.id !== itemId);
    onUpdateMenu(updatedMenu);
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedMenu = { ...menuItems };
    delete updatedMenu[categoryId];
    onUpdateMenu(updatedMenu);
  };

  const handleImageUpload = (file, setImageField) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageField(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewCategory(prev => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditCategoryImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setEditingCategory(prev => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(-45deg, #1f2937, #374151, #4b5563, #6b7280)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'rgba(31, 41, 55, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        border: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#f9fafb',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            Lezzet Kapısı - Yönetim Paneli
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 16px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Çıkış Yap
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(102, 126, 234, 0.2)' }}>
            <button
              onClick={() => setActiveTab('categories')}
              style={{
                padding: '12px 24px',
                background: activeTab === 'categories' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(55, 65, 81, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Kategoriler
            </button>
            <button
              onClick={() => setActiveTab('products')}
              style={{
                padding: '12px 24px',
                background: activeTab === 'products' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(55, 65, 81, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Ürünler
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#f9fafb',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                Ürün Yönetimi
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                + Yeni Ürün Ekle
              </button>
            </div>

            {showAddForm && (
              <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(31, 41, 55, 0.6)',
                backdropFilter: 'blur(10px)',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: 'rgba(31, 41, 55, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  padding: '24px',
                  width: '100%',
                  maxWidth: '500px',
                  margin: '0 16px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: 'bold',
                      color: '#f9fafb',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}>
                      Yeni Ürün Ekle
                    </h3>
                    <button
                      onClick={() => setShowAddForm(false)}
                      style={{ 
                        color: '#f3f4f6', 
                        cursor: 'pointer', 
                        fontSize: '20px',
                        background: 'none',
                        border: 'none',
                        padding: '4px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Kategori:
                      </label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                      >
                        {Object.entries(menuItems).map(([id, category]) => (
                          <option key={id} value={id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Ürün Adı:
                      </label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                        placeholder="Ürün adını girin"
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Fiyat:
                      </label>
                      <input
                        type="text"
                        value={newItem.price}
                        onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="₺100"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Açıklama:
                      </label>
                      <textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        rows="3"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                        placeholder="Ürün açıklamasını girin"
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Ürün Fotoğrafı:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleImageUpload(e.target.files[0], (imageData) => 
                              setNewItem(prev => ({ ...prev, image: imageData }))
                            );
                          }
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                      />
                      {newItem.image && (
                        <img
                          src={newItem.image}
                          alt="Preview"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginTop: '8px'
                          }}
                        />
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button
                        onClick={handleAddItem}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Ekle
                      </button>
                      <button
                        onClick={() => setShowAddForm(false)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 16px rgba(107, 114, 128, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {Object.entries(menuItems).map(([categoryId, category]) => (
              <div key={categoryId} style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                  {category.name}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  {category.items.map((item) => (
                    <div key={item.id} style={{
                      background: 'rgba(31, 41, 55, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '6px'
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</h4>
                          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{item.price}</p>
                          <p style={{ fontSize: '12px', color: '#9ca3af' }}>{item.description}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <button
                            onClick={() => setEditingItem({ ...item, category: categoryId })}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDeleteItem(categoryId, item.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#f9fafb',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                Kategori Yönetimi
              </h2>
              <button
                onClick={() => setShowAddCategoryForm(true)}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                + Yeni Kategori Ekle
              </button>
            </div>

            {showAddCategoryForm && (
              <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(31, 41, 55, 0.6)',
                backdropFilter: 'blur(10px)',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: 'rgba(31, 41, 55, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '12px',
                  padding: '24px',
                  width: '100%',
                  maxWidth: '500px',
                  margin: '0 16px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: 'bold',
                      color: '#f9fafb',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}>
                      Yeni Kategori Ekle
                    </h3>
                    <button
                      onClick={() => setShowAddCategoryForm(false)}
                      style={{ 
                        color: '#f3f4f6', 
                        cursor: 'pointer', 
                        fontSize: '20px',
                        background: 'none',
                        border: 'none',
                        padding: '4px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Kategori Adı
                      </label>
                      <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                        placeholder="Kategori adını girin"
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#f9fafb'
                      }}>
                        Kategori Resmi
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageUpload}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'rgba(31, 41, 55, 0.9)',
                          color: '#f9fafb',
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          borderRadius: '8px',
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                        required
                      />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button
                        onClick={handleAddCategory}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Kategori Ekle
                      </button>
                      <button
                        onClick={() => setShowAddCategoryForm(false)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 16px rgba(107, 114, 128, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              {Object.entries(menuItems).map(([categoryId, category]) => (
                <div key={categoryId} style={{
                  background: 'rgba(31, 41, 55, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#f9fafb',
                        margin: '0'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#f3f4f6',
                        margin: '4px 0 0 0'
                      }}>
                        {category.items.length} ürün
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setEditingCategory({ ...category, originalData: category })}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(245, 158, 11, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(categoryId)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {editingItem && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(31, 41, 55, 0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              maxWidth: '500px',
              margin: '0 16px',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f9fafb', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Ürün Düzenle</h3>
                <button
                  onClick={() => setEditingItem(null)}
                  style={{ color: '#f3f4f6', cursor: 'pointer', fontSize: '20px', background: 'none', border: 'none', padding: '4px' }}
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>Kategori:</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  >
                    {Object.entries(menuItems).map(([id, category]) => (
                      <option key={id} value={id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>Ürün Adı:</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>Fiyat:</label>
                  <input
                    type="text"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, price: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>Açıklama:</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button
                    onClick={handleEditItem}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 16px rgba(107, 114, 128, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {editingCategory && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(31, 41, 55, 0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '24px',
              width: '100%',
              maxWidth: '500px',
              margin: '0 16px',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f9fafb', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Kategori Düzenle</h3>
                <button
                  onClick={() => setEditingCategory(null)}
                  style={{ color: '#f3f4f6', cursor: 'pointer', fontSize: '20px', background: 'none', border: 'none', padding: '4px' }}
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>Kategori Adı:</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory(prev => ({ ...prev, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>İkon (Emoji):</label>
                  <input
                    type="text"
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory(prev => ({ ...prev, icon: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#f9fafb' }}>Kategori Fotoğrafı:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleEditCategoryImageUpload(e.target.files[0]);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(31, 41, 55, 0.9)',
                      color: '#f9fafb',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.2)'}
                  />
                  {editingCategory.image && (
                    <img
                      src={editingCategory.image}
                      alt="Preview"
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginTop: '8px'
                      }}
                    />
                  )}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button
                    onClick={handleEditCategory}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 16px rgba(107, 114, 128, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 