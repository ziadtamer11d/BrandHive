import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Package, Users, CheckCircle2, MessageSquare, Heart, Share2, ArrowLeft, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { brands, products } from '../data/mockData';
import toast from 'react-hot-toast';

export default function BrandPage() {
  const { slug } = useParams();
  const brand = brands.find(b => b.slug === slug);
  const [activeTab, setActiveTab] = useState('Bazaar');
  const [following, setFollowing] = useState(false);
  const [sortBy, setSortBy] = useState('Best Match');
  const [filterCat, setFilterCat] = useState('All');

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brand not found</h2>
          <Link to="/explore" className="btn-primary mt-4">Explore Brands</Link>
        </div>
      </div>
    );
  }

  const brandProducts = products.filter(p => p.brandId === brand.id);
  const tabs = [`Bazaar (${brandProducts.length})`, `Reviews (${Math.floor(Math.random() * 300 + 100)})`, 'About', 'Policies'];

  const handleFollow = () => {
    setFollowing(!following);
    toast.success(following ? `Unfollowed ${brand.name}` : `Following ${brand.name}!`, {
      icon: following ? '💔' : '❤️',
      style: { borderRadius: '12px' },
    });
  };

  const handleMessage = () => {
    toast('Opening chat with ' + brand.name, {
      icon: '💬',
      style: { borderRadius: '12px' },
    });
  };

  const filteredProducts = brandProducts.filter(p => {
    if (filterCat === 'All') return true;
    if (filterCat === 'On Sale') return p.discount > 0;
    if (filterCat === 'New Arrivals') return p.isNew;
    if (filterCat === 'Customizable') return p.customizable;
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="page-container py-3">
          <Link to="/explore" className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-navy transition-colors">
            <ArrowLeft size={14} />
            Back to Brands
          </Link>
        </div>
      </div>

      {/* Brand Header */}
      <div className={`bg-gradient-to-r ${brand.coverColor || 'from-gray-100 to-gray-50'} border-b border-gray-200`}>
        <div className="page-container py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Brand Avatar */}
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${brand.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-white font-bold text-3xl">{brand.initials}</span>
            </div>

            {/* Brand Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-display font-bold text-gray-900">{brand.name}</h1>
                {brand.verified && (
                  <span className="badge-verified text-sm">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1"><MapPin size={13} /> {brand.location}</span>
                <span>· Member since {brand.memberSince}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {brand.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 max-w-xl leading-relaxed">{brand.longDescription}</p>
            </div>

            {/* Stats + Actions */}
            <div className="flex flex-col items-end gap-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { value: brand.products, label: 'Products' },
                  { value: brand.sales >= 1000 ? `${(brand.sales/1000).toFixed(1)}K` : brand.sales, label: 'Sales' },
                  { value: `${brand.rating}★`, label: 'Rating' },
                  { value: brand.followers >= 1000 ? `${(brand.followers/1000).toFixed(1)}K` : brand.followers, label: 'Followers' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="text-lg font-bold text-brand-navy">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={handleFollow} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  following
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-brand-navy text-white hover:bg-opacity-90'
                }`}>
                  <Heart size={15} fill={following ? 'currentColor' : 'none'} className={following ? 'text-red-500' : ''} />
                  {following ? 'Following' : '+ Follow'}
                </button>
                <button onClick={handleMessage} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 border-gray-200 hover:border-brand-navy text-gray-700 hover:text-brand-navy transition-all">
                  <MessageSquare size={15} />
                  Message
                </button>
                <button className="p-2.5 rounded-xl border-2 border-gray-200 hover:border-brand-navy text-gray-500 hover:text-brand-navy transition-all">
                  <Share2 size={15} />
                </button>
              </div>

              {/* Shipping info */}
              <div className="flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Truck size={12} /> {brand.shipping}</span>
                <span className="flex items-center gap-1"><RotateCcw size={12} /> {brand.returns}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="page-container">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const tabKey = tab.split(' ')[0];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive ? 'border-brand-navy text-brand-navy' : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="page-container py-8">
        {/* Bazaar Tab */}
        {activeTab === 'Bazaar' && (
          <div>
            {/* Filters bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {['All', 'On Sale', 'New Arrivals', 'Customizable'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterCat(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterCat === f ? 'bg-brand-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  {f}
                </button>
              ))}
              <div className="ml-auto">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="input-field py-2 text-sm w-40"
                >
                  <option>Best Match</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Top Rated</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📦</div>
                <p className="text-gray-500">No products match these filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'Reviews' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-brand-navy">{brand.rating}</div>
                  <div className="flex justify-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(brand.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Overall Rating</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-4">{star}</span>
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '7%' : '2%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card p-5 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{['N', 'A', 'S'][i]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{['Nadia M.', 'Ahmed K.', 'Sara H.'][i]}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">Mar 2025</span>
                </div>
                <p className="text-sm text-gray-700">
                  {['Amazing quality! The craftsmanship is incredible.', 'Perfect gift, beautifully packaged and shipped fast!', 'Love every piece I bought from this brand. Will order again!'][i]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'About' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">About {brand.name}</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{brand.longDescription}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-cream rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700">Location</p>
                  <p className="text-gray-600 text-sm mt-1 flex items-center gap-1"><MapPin size={13} /> {brand.location}</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700">Member Since</p>
                  <p className="text-gray-600 text-sm mt-1">{brand.memberSince}</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700">Category</p>
                  <p className="text-gray-600 text-sm mt-1">{brand.category}</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-700">Response Rate</p>
                  <p className="text-gray-600 text-sm mt-1">98% within 24h</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'Policies' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Shop Policies</h3>
              <div className="space-y-6">
                {[
                  { title: 'Shipping Policy', icon: '🚚', text: `Orders are processed within 1–2 business days. Estimated delivery: ${brand.shipping}. Free shipping on orders above 500 EGP.` },
                  { title: 'Returns Policy', icon: '↩️', text: `${brand.returns} from delivery date. Items must be in original condition. Customized items are non-refundable.` },
                  { title: 'Payment Methods', icon: '💳', text: 'We accept all major credit cards, Vodafone Cash, Fawry, and Cash on Delivery.' },
                  { title: 'Customization', icon: '✨', text: 'Custom orders available for select products. Please message us before placing a custom order.' },
                ].map(p => (
                  <div key={p.title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{p.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{p.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
