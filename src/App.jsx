import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

const initialMenuData = {
  kahvalti: {
    name: 'Kahvaltı',
    icon: '🍳',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60',
    items: [
      { 
        id: 1,
        name: 'Serpme Kahvaltı', 
        price: '₺180', 
        description: 'Zeytin, peynir çeşitleri, bal, kaymak, reçel, domates, salatalık, yumurta',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
      { 
        id: 2,
        name: 'Omlet', 
        price: '₺85', 
        description: 'Peynirli, mantarlı veya sebzeli',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
      { 
        id: 3,
        name: 'Menemen', 
        price: '₺90', 
        description: 'Özel baharatlarla hazırlanmış',
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
    ]
  },
  tostlar: {
    name: 'Tostlar',
    icon: '🥪',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60',
    items: [
      { 
        id: 4,
        name: 'Kaşarlı Tost', 
        price: '₺65', 
        description: 'Özel ekmek ile',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
      { 
        id: 5,
        name: 'Sucuklu Tost', 
        price: '₺75', 
        description: 'Özel ekmek ile',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
      { 
        id: 6,
        name: 'Karışık Tost', 
        price: '₺85', 
        description: 'Kaşar, sucuk, sosis',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
    ]
  },
  burgerler: {
    name: 'Burgerler',
    icon: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    items: [
      { 
        id: 7,
        name: 'Klasik Burger', 
        price: '₺120', 
        description: 'Dana eti, marul, domates, turşu',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
      { 
        id: 8,
        name: 'Cheese Burger', 
        price: '₺130', 
        description: 'Dana eti, cheddar peyniri, marul, domates',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
      { 
        id: 9,
        name: 'Tavuk Burger', 
        price: '₺110', 
        description: 'Izgara tavuk göğsü, marul, mayonez',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
        status: 'active'
      },
    ]
  },
};

// Sosyal medya ve harita linkleri
const socialLinks = {
  googleMaps: 'https://example.com/maps',
  instagram: 'https://example.com/instagram',
  facebook: 'https://example.com/facebook'
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [menuData, setMenuData] = useState(initialMenuData);

  const handleUpdateMenu = (updatedMenu) => {
    setMenuData(updatedMenu);
  };

  const handleAdminLogin = (success) => {
    if (success) {
      setIsAdmin(true);
      setShowLogin(false);
    }
  };

  const handleAdminClick = () => {
    setShowLogin(true);
  };

  const handleSocialClick = (platform) => {
    window.open(socialLinks[platform], '_blank');
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (showLogin) {
    return <Login onLogin={handleAdminLogin} />;
  }

  if (isAdmin) {
    return <AdminPanel 
      menuItems={menuData} 
      onUpdateMenu={handleUpdateMenu} 
      onLogout={() => setIsAdmin(false)}
    />;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(-45deg, #1f2937, #374151, #4b5563, #6b7280)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite'
    }}>
      <header style={{ 
        background: 'rgba(31, 41, 55, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  animation: 'pulse 2s infinite'
                }}>
                  <span style={{
                    fontSize: '20px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    🍽️
                  </span>
                </div>
                <div>
                  <h1 style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#f9fafb',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                  }}>Lezzet Kapısı</h1>
                  <p style={{ fontSize: '14px', color: '#f3f4f6' }}>Geleneksel Türk Mutfağı</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Sosyal Medya ve Harita Butonları */}
              <button
                onClick={() => handleSocialClick('googleMaps')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#4285f4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#3367d6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4285f4'}
                title="Google Maps'te Aç"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Harita
              </button>
              <button
                onClick={() => handleSocialClick('instagram')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#e4405f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d63384'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e4405f'}
                title="Instagram'da Takip Et"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </button>
              <button
                onClick={() => handleSocialClick('facebook')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#1877f2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#166fe5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1877f2'}
                title="Facebook'ta Beğen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              
              {/* Mevcut Butonlar */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="header-button secondary"
              >
                📱 QR Kod
              </button>
              <button
                onClick={handleAdminClick}
                className="header-button secondary"
              >
                👨‍💼 Yönetim
              </button>
            </div>
          </div>
        </div>
      </header>

      {showQR && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Menü QR Kodu</h2>
              <button
                onClick={() => setShowQR(false)}
                style={{ color: '#6b7280', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <QRCodeSVG
                value={window.location.href}
                size={256}
                level="H"
                includeMargin={true}
                style={{ marginBottom: '16px' }}
              />
              <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
                Bu QR kodu tarayarak menüye mobil cihazınızdan erişebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        {selectedCategory ? (
          // Kategori seçildiğinde ürünleri göster
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <button
                onClick={handleBackToCategories}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginRight: '16px'
                }}
              >
                ← Geri
              </button>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9fafb' }}>
                {menuData[selectedCategory].name}
              </h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {menuData[selectedCategory].items.map((item) => (
                <div key={item.id} className="menu-card">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-image"
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h3 style={{ fontWeight: '500', fontSize: '18px', color: '#1f2937' }}>{item.name}</h3>
                      <div style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        minWidth: 'fit-content'
                      }}>
                        {item.price}
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Ana sayfa - kategorileri göster
          <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: '800', 
                color: '#f9fafb',
                marginBottom: '12px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
              }}>
                Kategorilerimizi Keşfedin
              </h2>
              <p style={{ 
                fontSize: '18px', 
                color: '#f3f4f6',
                fontWeight: '500',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Lezzetli yemeklerimizi kategorilere göre inceleyin ve favori lezzetlerinizi keşfedin
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {Object.entries(menuData)
                .filter(([categoryId, category]) => category.items.length > 0) // Boş kategorileri filtrele
                .map(([categoryId, category]) => (
                <div
                  key={categoryId}
                  onClick={() => handleCategoryClick(categoryId)}
                  style={{
                    background: 'rgba(31, 41, 55, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-12px) scale(1.03)';
                    e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }} />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ 
                      fontSize: '22px', 
                      fontWeight: '700', 
                      color: '#f9fafb',
                      marginBottom: '8px',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}>
                      {category.name}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#f3f4f6', 
                      marginBottom: '16px',
                      fontWeight: '500'
                    }}>
                      {category.items.length} ürün
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#667eea',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}>
                      İncele →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '32px 0', marginTop: '48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Lezzet Kapısı Restaurant</h3>
            <p style={{ color: '#9ca3af' }}>Adres: Örnek Mahallesi, Lezzet Sokak No:1, İstanbul</p>
            <p style={{ color: '#9ca3af' }}>Tel: (0212) 123 45 67</p>
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>© 2024 Lezzet Kapısı. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 