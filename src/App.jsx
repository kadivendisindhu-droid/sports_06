import { useEffect, useMemo, useState } from 'react';
import './App.css';

const WHATSAPP_NUMBER = '919182606976'; // Change to your WhatsApp number, country code included, no + or spaces.

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load products.json');
        return res.json();
      })
      .then(setProducts)
      .catch((err) => console.error(err));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(
    () => products.filter(p => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search, category]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: Math.min(item.qty + 1, product.stock) } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function whatsapp(product) {
    const text = `Hi, I am interested in ${product.name}. Please let me know when it is available.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <div className="app">
      <div className="top-cart-summary" aria-label="Shopping cart summary">
        <span className="top-cart-count">🛒 Cart ({cartCount})</span>
        <span className="top-cart-total">Total: ₹{total.toLocaleString('en-IN')}</span>
      </div>
      <header className="header">
        <div className="brand">
          <span className="brand-icon">🏆</span>
          <div>
            <h1>Sports Store</h1>
            <p>Gear up. Play hard.</p>
          </div>
        </div>
        <div className="header-actions">
          <input
            className="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <div className="cart-badge">🛒 Cart <strong>{cartCount}</strong></div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <span className="eyebrow">SPORTS ESSENTIALS</span>
            <h2>Gear up for every move.</h2>
            <p>Shop quality gear for running, football, cricket and knee support.</p>
          </div>
          <div className="hero-ball">⚽</div>
        </section>

        <div className="category-bar">{categories.map(c => <button key={c} className={category === c ? "category-btn active" : "category-btn"} onClick={() => setCategory(c)}>{c}</button>)}</div>

        <div className="section-head">
          <div>
            <h2>Our Products</h2>
            <p>{filteredProducts.length} products available</p>
          </div>
          <span className="json-note">Products managed from <code>public/products.json</code></span>
        </div>

        <section className="product-grid">
          {filteredProducts.map(product => (
            <article className="product-card" key={product.id}>
              <div className="image-wrap">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.stock === 0 && <span className="out">OUT OF STOCK</span>}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
                {product.stock > 0 ? (
                  <>
                    <p className="stock">{product.stock} in stock</p>
                    <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  </>
                ) : (
                  <>
                    <p className="stock out-text">Currently unavailable</p>
                    <button className="whatsapp-btn" onClick={() => whatsapp(product)}>
                      💬 Contact on WhatsApp
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="cart-section">
          <div className="cart-title">
            <h2>Your Cart</h2>
            <span>{cartCount} item(s)</span>
          </div>
          {cart.length === 0 ? (
            <p className="empty">Your cart is empty. Add a product to get started.</p>
          ) : (
            <>
              <div className="cart-list">
                {cart.map(item => (
                  <div className="cart-row" key={item.id}>
                    <span>{item.name} × {item.qty}</span>
                    <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
              <div className="cart-total">Total: <strong>₹{total.toLocaleString('en-IN')}</strong></div>
            </>
          )}
        </section>
      </main>

      <footer>© {new Date().getFullYear()} Sports Store · 4 categories · Built with React + Vite</footer>
    </div>
  );
}
