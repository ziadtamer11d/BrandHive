import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, TrendingUp, Shield, Zap, Heart,
  ChevronRight, Play, Sparkles, MapPin, Package, Users, Award, CheckCircle2
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';
import { products, brands, categories, globalBrands, testimonials } from '../data/mockData';

const heroSlides = [
  {
    tag: "Egypt's #1 Local Marketplace",
    headline: "Discover\nEgypt's Finest.",
    sub: "Shop curated handmade goods, local artisans, and authentic Egyptian products — all delivered across Egypt.",
    cta1: { label: 'Shop Now', path: '/products' },
    cta2: { label: 'Start Selling', path: '/sell' },
    accent: 'from-brand-navy to-blue-900',
    items: [
      { cat: 'Handmade', name: 'Pharaonic Pottery', from: '350 EGP', icon: '🏺' },
      { cat: 'Fashion', name: 'Silk Kaftan', from: '780 EGP', icon: '👗' },
      { cat: 'Jewelry', name: 'Gold Ankh Pendant', from: '1,200 EGP', icon: '💍' },
      { cat: 'Organic', name: 'Natural Honey', from: '250 EGP', icon: '🍯' },
    ]
  }
];

const stats = [
  { value: '12K+', label: 'Local Brands', icon: '🏪' },
  { value: '280K', label: 'Products', icon: '📦' },
  { value: '27', label: 'Governorates', icon: '📍' },
  { value: '500K+', label: 'Happy Buyers', icon: '😊' },
];

const features = [
  { icon: Shield, title: 'Verified Sellers', desc: 'Every brand is manually reviewed and verified by our team.', color: 'text-emerald-500' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Free delivery on orders above 500 EGP across all 27 governorates.', color: 'text-amber-500' },
  { icon: Heart, title: 'Support Local', desc: 'Every purchase directly supports Egyptian entrepreneurs and artisans.', color: 'text-rose-500' },
  { icon: Award, title: 'Best Quality', desc: 'AI-powered reviews and ratings ensure only the best products shine.', color: 'text-purple-500' },
];

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const isNumeric = !isNaN(parseInt(target));
  const numTarget = parseInt(target) || 0;

  useEffect(() => {
    if (!inView || !isNumeric) return;
    let start = 0;
    const increment = numTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numTarget, duration, isNumeric]);

  return (
    <span ref={ref}>
      {isNumeric ? count.toLocaleString() : target}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Popular');
  const tabs = ['Popular', 'New', 'Featured'];
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProducts = products.filter(p => {
    if (activeTab === 'Popular') return p.reviews > 50;
    if (activeTab === 'New') return p.isNew;
    if (activeTab === 'Featured') return p.isFeatured;
    return true;
  }).slice(0, 8);

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative bg-brand-navy overflow-hidden min-h-[85vh] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="page-container relative z-10 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm font-semibold mb-6 border border-brand-gold/30">
                <Sparkles size={14} />
                Egypt's #1 Local Marketplace
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] mb-6">
                Discover<br />
                <span className="text-gradient-gold">Egypt's</span><br />
                Finest.
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Shop curated handmade goods, local artisans, and authentic Egyptian products — all delivered across Egypt.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/products" className="btn-gold text-base px-8 py-4">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/sell" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy text-base px-8 py-4">
                  Start Selling
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-display font-bold text-white">
                      <CountUp target={parseInt(stat.value) || 0} />{stat.value.replace(/[0-9]/g, '')}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Product Showcase */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {heroSlides[0].items.map((item, i) => (
                  <div
                    key={item.name}
                    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all cursor-pointer animate-fade-in`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <div className="text-gray-400 text-xs font-medium mb-1">{item.cat}</div>
                    <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
                    <div className="text-brand-gold text-sm font-bold">From {item.from}</div>
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-brand-gold text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-gold animate-float">
                🔥 Trending
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="bg-white border-y border-gray-100">
        <div className="page-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-start gap-3 p-3">
                <div className={`p-2 rounded-xl bg-gray-50 ${color} flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-brand-cream">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-1">Browse</p>
              <h2 className="section-heading">Shop by Category</h2>
            </div>
            <Link to="/products" className="btn-ghost text-sm hidden sm:flex">
              View all categories <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-white hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 text-center"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-brand-navy transition-colors leading-tight">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRENDING PRODUCTS ===== */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-1">Curated</p>
              <h2 className="section-heading">Trending This Week</h2>
            </div>
            <div className="flex items-center gap-2">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <Link to="/products" className="btn-ghost text-sm hidden md:flex">
                See all <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/products" className="btn-outline">
              Browse All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BRAND BAZAARS ===== */}
      <section className="py-16 bg-brand-cream">
        <div className="page-container">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-1">New Feature</p>
              <h2 className="section-heading">Brand Bazaars</h2>
            </div>
            <Link to="/brands" className="btn-ghost text-sm hidden sm:flex">
              Explore all bazaars <ChevronRight size={16} />
            </Link>
          </div>
          <p className="text-gray-500 mb-8 max-w-xl">
            Every brand has its own mini-marketplace. Browse, follow, and shop their full collection.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.filter(b => b.featured).slice(0, 4).map((brand) => (
              <div key={brand.id} className="card overflow-hidden">
                {/* Brand Header */}
                <div className={`p-4 bg-gradient-to-br ${brand.coverColor || 'from-gray-100 to-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${brand.color} flex items-center justify-center shadow`}>
                      <span className="text-white font-bold">{brand.initials}</span>
                    </div>
                    {brand.verified && <span className="badge-verified"><CheckCircle2 size={10} /> Verified</span>}
                  </div>
                  <h3 className="font-bold text-gray-900">{brand.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={10} />
                    {brand.location}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs"><span className="font-bold text-gray-900">{brand.products}</span> <span className="text-gray-500">Products</span></span>
                    <span className="text-xs"><span className="font-bold text-gray-900">{brand.sales >= 1000 ? `${(brand.sales/1000).toFixed(1)}K` : brand.sales}</span> <span className="text-gray-500">Sales</span></span>
                    <span className="text-xs"><span className="font-bold text-amber-500">★ {brand.rating}</span></span>
                  </div>
                </div>

                {/* Mini product grid */}
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {products.filter(p => p.brandId === brand.id).slice(0, 3).map((p) => (
                      <div key={p.id} className={`aspect-square rounded-lg bg-gradient-to-br ${brand.coverColor || 'from-gray-100 to-gray-50'} flex items-center justify-center text-xl`}>
                        {p.category === 'Handmade' ? '🏺' : p.category === 'Fashion' ? '👗' : p.category === 'Jewelry' ? '💍' : '🎨'}
                      </div>
                    ))}
                  </div>
                  <Link to={`/brand/${brand.slug}`} className="block w-full text-center py-2 bg-brand-navy text-white text-sm font-semibold rounded-xl hover:bg-opacity-90 transition-colors">
                    Visit Bazaar →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GEN Z SECTION ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-brand-navy to-pink-900"></div>
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        {/* Floating elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float" style={{animationDelay:'0s'}}>🏺</div>
        <div className="absolute top-1/3 right-16 text-5xl opacity-20 animate-float" style={{animationDelay:'0.5s'}}>💍</div>
        <div className="absolute bottom-10 left-1/4 text-4xl opacity-20 animate-float" style={{animationDelay:'1s'}}>👗</div>
        <div className="absolute bottom-1/4 right-1/3 text-5xl opacity-20 animate-float" style={{animationDelay:'1.5s'}}>🎨</div>

        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6 border border-white/20 backdrop-blur-sm">
              <Sparkles size={14} className="text-yellow-400" />
              For the Culture ✨
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Local & Proud.<br />
              <span className="text-gradient-genz">Egyptian by Heart.</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              We're not just a marketplace. We're a movement. Supporting Egyptian creators, celebrating our culture, and making local shopping the <em>vibe</em>.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { emoji: '🔥', stat: '12K+', label: 'Local Brands' },
                { emoji: '💰', stat: '5%', label: 'Commission Only' },
                { emoji: '🚀', stat: '500K+', label: 'Active Buyers' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-2xl font-display font-bold text-white">{item.stat}</div>
                  <div className="text-gray-400 text-sm">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Category Tags - Gen Z style */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['#MadeInEgypt', '#LocalFirst', '#SupportSmallBiz', '#EgyptianArtisans', '#BrandHive', '#ShopLocal'].map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/explore" className="btn-gold px-8 py-4 text-base">
                Explore Brands 🏪
              </Link>
              <Link to="/sell" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-brand-navy transition-all text-base">
                Start Selling 💼
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOP BRANDS ===== */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-1">Trusted Sellers</p>
              <h2 className="section-heading">Top Brands on BrandHive</h2>
            </div>
            <Link to="/explore" className="btn-ghost text-sm hidden sm:flex">
              All brands <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.slice(0, 4).map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GLOBAL BRANDS ===== */}
      <section className="py-16 bg-brand-cream">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-1">International</p>
            <h2 className="section-heading">Global Brands Available in Egypt</h2>
            <p className="text-gray-500 mt-2">Shop international brands — delivered straight to your door.</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {globalBrands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer group">
                <span className="text-3xl group-hover:scale-110 transition-transform">{brand.logo}</span>
                <span className="text-xs font-semibold text-gray-700">{brand.name}</span>
                <span className="text-xs text-gray-400">{brand.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 bg-white">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-1">Reviews</p>
            <h2 className="section-heading">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SELL ON BRANDHIVE CTA ===== */}
      <section className="py-16 bg-brand-navy">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                Ready to grow your brand?
              </h2>
              <p className="text-gray-300 max-w-lg">
                Join 12,000+ Egyptian brands on BrandHive. Just 5% commission — no monthly fees. Start selling today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link to="/sell" className="btn-gold px-8 py-4 text-base">
                Start Selling Free
              </Link>
              <Link to="/explore" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all text-base whitespace-nowrap">
                Browse Brands
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
