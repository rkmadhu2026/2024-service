import { useState } from 'react';
import './UVCollection.css'; // Let's use the new CSS file
import { Link } from 'react-router-dom';

const UVCollection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const collections = [
    { title: "WOMENSWEAR", subtitle: "Ethereal symphonies & fluid forms" },
    { title: "MENSWEAR", subtitle: "Olympian Spirit & classic couture" },
    { title: "KIDSWEAR", subtitle: "Playful elegance & heritage styles" },
    { title: "ACCESSORIES", subtitle: "Intricate reinterpretation of craft" },
  ];

  const featuredDesigners = [
    { name: "Abhinav Mishra", desc: "Kaleidoscopic mirrors and heritage craftwork." },
    { name: "Anushka Khanna", desc: "Bold colours and fluid form meet the intricacy of delicate embroidery." },
    { name: "Dolly J", desc: "Delicate reinterpretation of classical craftsmanship." }
  ];

  const products = [
    { name: "ANARKALI DUPATTA CHURIDAR IVORY", designer: "ABHINAV MISHRA", price: "Rs. 205,000" },
    { name: "ANARKALI DUPATTA CHURIDAR PINK", designer: "GOPI VAID", price: "Rs. 51,500" },
    { name: "ANARKALI PANT DUPATTA AQUA", designer: "MAHIMA MAHAJAN", price: "Rs. 64,200" },
    { name: "ANARKALI PANT DUPATTA PINK", designer: "GOPI VAID", price: "Rs. 41,000" }
  ];

  return (
    <div className="uv-store">
      {/* ── Navbar ── */}
      <nav className="uv-nav">
        <div className="uv-nav__left">
          <button className="uv-nav__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <div className="uv-nav__links">
            <a href="#">New Arrivals</a>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Accessories</a>
          </div>
        </div>
        
        <div className="uv-nav__logo">
          UV COLLECTION
        </div>

        <div className="uv-nav__right">
          <a href="#">Sign in</a>
          <a href="#">Orders</a>
          <a href="#">Cart (0)</a>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header className="uv-hero">
        <div className="uv-hero__content animate-fade-up">
          <h1 className="uv-hero__title">LUXURY MADE PERSONAL</h1>
          <p className="uv-hero__desc">
            An expansive multi-level styling experience. Discover the largest fashion destination, now online by Webisure.
          </p>
          <button className="uv-btn-primary">Shop Now</button>
        </div>
      </header>

      {/* ── Explore Categories ── */}
      <section className="uv-section uv-categories">
        <h2 className="uv-section__title">EXPLORE</h2>
        <div className="uv-category-grid">
          {collections.map((cat, i) => (
            <div key={i} className="uv-category-card">
              <div className="uv-category-card__bg" />
              <div className="uv-category-card__content">
                <h3>{cat.title}</h3>
                <p>{cat.subtitle}</p>
                <span className="uv-link">Discover →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Designers Series ── */}
      <section className="uv-section uv-designers">
        <h2 className="uv-section__title">THE MOMENT</h2>
        <p className="uv-section__sub">The newest arrivals in UV Collection - fresh off the runway, curated just for you.</p>
        
        <div className="uv-designer-list">
          {featuredDesigners.map((designer, i) => (
            <div key={i} className="uv-designer-row">
              <div className="uv-designer-info">
                <h3>{designer.name}</h3>
                <p>{designer.desc}</p>
              </div>
              <button className="uv-btn-outline">Discover {designer.name}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="uv-section uv-products">
        <div className="uv-product-grid">
          {products.map((prod, i) => (
            <div key={i} className="uv-product-card">
              <div className="uv-product-img">
                <div className="uv-product-img__placeholder" />
              </div>
              <div className="uv-product-info">
                <span className="uv-product-designer">{prod.designer}</span>
                <h4 className="uv-product-name">{prod.name}</h4>
                <div className="uv-product-price">{prod.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="uv-footer">
        <div className="uv-footer__grid">
          <div className="uv-footer__brand">
            <h2>UV COLLECTION</h2>
            <p>Luxury Made Personal.</p>
            <p>Over 70 labels spanning couture, bridal, and contemporary fashion.</p>
          </div>
          <div className="uv-footer__links">
            <h4>Contact</h4>
            <a href="tel:+918050096199">+91 80500 96199</a>
            <a href="mailto:support@uvcollection.com">support@uvcollection.com</a>
            <a href="#">@uv.official</a>
          </div>
          <div className="uv-footer__links">
            <h4>Legal</h4>
            <a href="#">Privacy policy</a>
            <a href="#">Refund policy</a>
            <a href="#">Terms of service</a>
          </div>
        </div>
        <div className="uv-footer__bottom">
          <p>© 2026 UV Collection by Webisure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UVCollection;
