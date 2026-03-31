import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown,
  Store, Bell, LogOut, Settings, Package, LayoutDashboard, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore', hasDropdown: true },
  { label: 'Bazaars', path: '/brands' },
  { label: 'Global', path: '/global' },
  { label: 'Sell on BrandHive', path: '/sell', highlight: true },
];

const EXPLORE_MENU = [
  { label: 'All Brands', path: '/explore', icon: '🏪' },
  { label: 'All Products', path: '/products', icon: '🛍️' },
  { label: 'Handmade', path: '/products?category=handmade', icon: '🏺' },
  { label: 'Fashion', path: '/products?category=fashion', icon: '👗' },
  { label: 'Jewelry', path: '/products?category=jewelry', icon: '💍' },
  { label: 'Home Decor', path: '/products?category=home-decor', icon: '🏠' },
  { label: 'Organic', path: '/products?category=organic', icon: '🌿' },
  { label: 'Art & Culture', path: '/products?category=art', icon: '🎨' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin, isSeller } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isSeller) return '/seller/dashboard';
    return '/account';
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-navy text-white text-xs py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 mr-8">
              <span>🚚 Free delivery on orders above 500 EGP</span>
              <span className="text-brand-gold">✦</span>
              <span>🌙 Ramadan Special — ends soon</span>
              <span className="text-brand-gold">✦</span>
              <span>✅ 12,000+ verified local brands across Egypt</span>
              <span className="text-brand-gold">✦</span>
              <span>🏆 Egypt's #1 Local Marketplace</span>
              <span className="text-brand-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="page-container">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 bg-brand-navy rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">B</span>
              </div>
              <span className="font-display font-bold text-brand-navy text-xl hidden sm:block">BrandHive</span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {NAV_LINKS.map((link) => (
                link.hasDropdown ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${location.pathname === link.path ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy hover:bg-gray-50'}`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-gray-100 p-2 animate-fade-in">
                        {EXPLORE_MENU.map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-navy transition-colors"
                          >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${link.highlight
                        ? 'text-brand-gold font-semibold hover:bg-brand-gold-pale'
                        : location.pathname === link.path
                          ? 'text-brand-navy font-semibold'
                          : 'text-gray-600 hover:text-brand-navy hover:bg-gray-50'}`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brands, products, artisans..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
                />
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-colors"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link to="/account?tab=wishlist" className="relative p-2 rounded-lg text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-colors hidden sm:flex items-center">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 rounded-lg text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-colors">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-navy text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{user.name?.[0]?.toUpperCase()}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform hidden sm:block ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-gray-100 p-2 animate-fade-in">
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <Link to={getDashboardPath()} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-navy transition-colors">
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-navy transition-colors">
                          <Settings size={15} />
                          Admin Panel
                        </Link>
                      )}
                      {isSeller && (
                        <Link to="/seller/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-navy transition-colors">
                          <Store size={15} />
                          Seller Portal
                        </Link>
                      )}
                      <Link to="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-navy transition-colors">
                        <User size={15} />
                        My Account
                      </Link>
                      <Link to="/account?tab=orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-navy transition-colors">
                        <Package size={15} />
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="hidden sm:block text-sm font-medium text-gray-700 hover:text-brand-navy px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary py-2 text-sm hidden sm:flex">
                    Join Free
                  </Link>
                  <Link to="/login" className="sm:hidden p-2 rounded-lg text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-colors">
                    <User size={20} />
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-brand-navy hover:bg-gray-50 transition-colors ml-1"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-100 px-4 py-3 animate-slide-up">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brands, products..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-up">
            <div className="page-container py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${link.highlight ? 'text-brand-gold' : 'text-gray-700 hover:bg-brand-cream hover:text-brand-navy'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
                {user ? (
                  <>
                    <Link to={getDashboardPath()} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-brand-cream hover:text-brand-navy">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors">
                      Sign In
                    </Link>
                    <Link to="/register" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold bg-brand-navy text-white hover:bg-opacity-90 transition-colors">
                      Join Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
