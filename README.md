# Digital QR Menu System

A modern, animated, and fully customizable digital restaurant menu website.  
Features a dark theme, category and product management, QR code generation, social media links, and a powerful admin panel.

---

## 🚀 Features

- **Dark & modern theme**: Glassmorphism, animated background, readable light text
- **Category & product management**: Easily add, edit, and delete categories and products
- **Visual menu**: Large category cards, product images, and prices
- **QR code generation**: Instantly create a QR code for your menu, share with customers
- **Social media & map links**: Google Maps, Instagram, Facebook
- **Admin panel**: Secure login, live menu management
- **Fully responsive**: Perfect on mobile, tablet, and desktop

---

## 🛠️ Installation

### Requirements

- Node.js 16+
- npm

### Setup Steps

1. **Clone the project**
   ```bash
   git clone <repo-link>
   cd menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🖥️ Customization Guide

### 1. **Restaurant Name, Address, and Contact Info**
- Edit these fields in `src/App.jsx`:
  ```js
  // Restaurant name
  <h1>Lezzet Kapısı</h1>
  // Address and phone are in the footer
  ```

### 2. **Social Media & Map Links**
- In `src/App.jsx`:
  ```js
  const socialLinks = {
    googleMaps: 'https://maps.google.com/?q=YOUR_RESTAURANT_ADDRESS',
    instagram: 'https://instagram.com/YOUR_INSTAGRAM',
    facebook: 'https://facebook.com/YOUR_FACEBOOK'
  };
  ```
- Replace with your own links.

### 3. **Using Your Own QR Code**
- The QR code automatically shows the current site address.
- If you deploy to your own domain, the QR code will point to that domain.
- To download the QR code, open the QR modal, right-click the image, and save it.

### 4. **Managing Categories & Products**
- **Log in to the admin panel** (see credentials below).
- Add, edit, or delete categories and products. Upload images by selecting or dragging files.
- All changes are instantly visible.

### 5. **Admin Panel Login & Changing Password**
- **Default username:** `admin`
- **Default password:** `admin123`
- To change the password:
  - Find this line in `src/components/Login.jsx`:
    ```js
    if (username === 'admin' && password === 'admin123') {
    ```
  - Change the username and password as you wish.
  - **Note:** For production, a backend or database is recommended for security.

---

## 🧩 How to Build Your Own Menu

1. **Log in to the admin panel.**
2. **Add categories**: Enter a category name and upload an image.
3. **Add products**: Enter product name, description, price, and image for each category.
4. **Edit/Delete**: Use the edit and delete buttons next to each category and product.
5. **Update social/contact info**: Edit in `src/App.jsx`.

---

## 🔒 Security & Data

- Menu data is stored in browser state (local). For real restaurants, backend integration is recommended.
- You must change the admin password in the code (see above).

---

## 💡 FAQ

- **How do I use the QR code for my restaurant?**
  - When you deploy to your own domain, the QR code will point to that address automatically.
- **How do I add my own social media links?**
  - Update the `socialLinks` object in `src/App.jsx`.
- **I forgot the admin password, what do I do?**
  - Reset it in `src/components/Login.jsx`.

---

## 📦 Dependencies

- React 18
- Vite
- Tailwind CSS
- qrcode.react
- 
---

<div align="center">

**Made with ❤️ by [@earkali](https://github.com/earkali)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/earkali)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/earkali)

</div> 
