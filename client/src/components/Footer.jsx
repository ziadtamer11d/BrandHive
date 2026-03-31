import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Link2 } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Products', path: '/products' },
    { label: 'Local Brands', path: '/explore' },
    { label: 'Brand Bazaars', path: '/brands' },
    { label: 'Global Brands', path: '/global' },
    { label: 'Sale', path: '/products?filter=sale' },
  ],
  Sellers: [
    { label: 'Start Selling', path: '/sell' },
    { label: 'Create a Bazaar', path: '/sell' },
    { label: 'Seller Fees', path: '/sell#fees' },
    { label: 'Seller Dashboard', path: '/seller/dashboard' },
    { label: 'Community', path: '/community' },
  ],
  Support: [
    { label: 'Help Center', path: '/support' },
    { label: 'Contact Us', path: '/support#contact' },
    { label: 'Returns Policy', path: '/support#returns' },
    { label: 'Shipping Info', path: '/support#shipping' },
    { label: 'Live Chat', path: '/chat' },
  ],
  Company: [
    { label: 'About BrandHive', path: '/about' },
    { label: 'Press', path: '/press' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Investor Relations', path: '/investors' },
  ],
};

const categories = [
  { label: 'Fashion', path: '/products?category=fashion' },
  { label: 'Jewelry', path: '/products?category=jewelry' },
  { label: 'Handmade', path: '/products?category=handmade' },
  { label: 'Home Decor', path: '/products?category=home-decor' },
  { label: 'Organic', path: '/products?category=organic' },
  { label: 'Art & Culture', path: '/products?category=art' },
  { label: 'Books', path: '/products?category=books' },
  { label: 'Beauty', path: '/products?category=beauty' },
  { label: 'Food & Drink', path: '/products?category=food' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300">
      {/* Newsletter Bar */}
      <div className="bg-brand-navy/80 border-b border-white/10">
        <div className="page-container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-display font-bold text-xl">Stay in the loop 🐝</h3>
              <p className="text-gray-400 text-sm mt-1">New brands, exclusive deals & Egyptian artisan stories — in your inbox.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold text-sm"
              />
              <button type="submit" className="btn-gold px-6 py-3 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-gold rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">B</span>
              </div>
              <span className="text-white font-display font-bold text-xl">BrandHive</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Egypt's premier marketplace for local brands, artisans, and global products. Empowering Egyptian entrepreneurs since 2024.
            </p>
            <div className="flex items-center gap-3">
              {[
                { emoji: '📸', href: '#', label: 'Instagram' },
                { emoji: '📘', href: '#', label: 'Facebook' },
                { emoji: '𝕏', href: '#', label: 'X/Twitter' },
                { emoji: '▶️', href: '#', label: 'YouTube' },
              ].map(({ emoji, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors text-sm"
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">Browse by category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.path}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-brand-gold/20 hover:text-brand-gold transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-wrap gap-6">
            <a href="mailto:support@brandhive.eg" className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-gold transition-colors">
              <Mail size={14} />
              support@brandhive.eg
            </a>
            <a href="tel:+201000000000" className="flex items-center gap-2 text-gray-400 text-sm hover:text-brand-gold transition-colors">
              <Phone size={14} />
              +20 100 000 0000
            </a>
            <span className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={14} />
              Cairo, Egypt 🇪🇬
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 BrandHive Inc. All rights reserved. &nbsp;
            <span className="text-brand-gold">🇪🇬 Made in Egypt</span>
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
