import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Heart, Star, User, MapPin, CreditCard,
  Bell, MessageSquare, LogOut, ChevronRight, ShoppingBag, TrendingUp, Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/CartContext';
import { demoUser, products } from '../../data/mockData';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Pending: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-100 text-red-700',
};

function NavItem({ icon: Icon, label, tab, activeTab, setActiveTab, badge }) {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={isActive ? 'sidebar-item-active' : 'sidebar-item'}
    >
      <Icon size={18} />
      <span>{label}</span>
      {badge > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');
  const navigate = useNavigate();

  const displayUser = user || demoUser;
  const orders = demoUser.orders;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const TABS = [
    { icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard' },
    { icon: Package, label: 'My Orders', tab: 'orders', badge: 1 },
    { icon: Heart, label: 'Wishlist', tab: 'wishlist', badge: wishlistItems.length },
    { icon: Star, label: 'Reviews', tab: 'reviews' },
  ];

  const PROFILE_TABS = [
    { icon: User, label: 'Profile Settings', tab: 'profile' },
    { icon: MapPin, label: 'Addresses', tab: 'addresses' },
    { icon: CreditCard, label: 'Payment Methods', tab: 'payment' },
    { icon: Bell, label: 'Notifications', tab: 'notifications' },
  ];

  const SUPPORT_TABS = [
    { icon: MessageSquare, label: 'Chat Support', tab: 'chat' },
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="page-container py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-4 sticky top-24">
              {/* User info */}
              <div className="flex items-center gap-3 p-3 mb-4 bg-brand-cream rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{displayUser.name?.[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{displayUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{displayUser.email}</p>
                </div>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">Account</p>
              {TABS.map(t => <NavItem key={t.tab} {...t} activeTab={activeTab} setActiveTab={setActiveTab} />)}

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2 mt-4">Profile</p>
              {PROFILE_TABS.map(t => <NavItem key={t.tab} {...t} activeTab={activeTab} setActiveTab={setActiveTab} />)}

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2 mt-4">Support</p>
              {SUPPORT_TABS.map(t => <NavItem key={t.tab} {...t} activeTab={activeTab} setActiveTab={setActiveTab} />)}

              <div className="border-t border-gray-100 mt-4 pt-3">
                <button onClick={handleLogout} className="sidebar-item text-red-500 hover:bg-red-50 w-full">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Tab Bar */}
          <div className="md:hidden w-full -mx-4 px-4 overflow-x-auto pb-4 mb-2">
            <div className="flex gap-2 whitespace-nowrap">
              {[...TABS, ...PROFILE_TABS, ...SUPPORT_TABS].map(t => (
                <button
                  key={t.tab}
                  onClick={() => setActiveTab(t.tab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium flex-shrink-0 transition-all ${
                    activeTab === t.tab ? 'bg-brand-navy text-white' : 'bg-white text-gray-600'
                  }`}
                >
                  <t.icon size={13} /> {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-display font-bold text-gray-900">
                      My Account
                    </h1>
                    <p className="text-gray-500 mt-1">
                      Welcome back, {displayUser.name?.split(' ')[0]} 👋
                    </p>
                  </div>
                  <Link to="/products" className="btn-primary text-sm">
                    Continue Shopping →
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Package, label: 'Total Orders', value: demoUser.orders.length + 8, color: 'bg-blue-100 text-blue-600' },
                    { icon: Heart, label: 'Wishlist Items', value: wishlistItems.length || demoUser.wishlistCount, color: 'bg-rose-100 text-rose-600' },
                    { icon: Star, label: 'Reviews Written', value: demoUser.reviewsCount, color: 'bg-amber-100 text-amber-600' },
                    { icon: TrendingUp, label: 'EGP Saved', value: `${demoUser.savedAmount.toLocaleString()}`, color: 'bg-emerald-100 text-emerald-600' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon size={18} />
                      </div>
                      <div className="text-2xl font-display font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-xl text-gray-900">Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="text-sm text-brand-gold hover:underline flex items-center gap-1">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {['Order ID', 'Product', 'Brand', 'Date', 'Amount', 'Status'].map(h => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 4).map(order => (
                          <tr key={order.id} className="border-b border-gray-50 last:border-0">
                            <td className="py-3 pr-4 font-mono text-xs text-brand-navy font-semibold">{order.id}</td>
                            <td className="py-3 pr-4 font-medium text-gray-900 max-w-[140px] truncate">{order.product}</td>
                            <td className="py-3 pr-4 text-gray-600">{order.brand}</td>
                            <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{order.date}</td>
                            <td className="py-3 pr-4 font-semibold text-gray-900 whitespace-nowrap">{order.amount.toLocaleString()} EGP</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">My Orders</h1>
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {['Order ID', 'Product', 'Brand', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                            <td className="py-3 pr-4 font-mono text-xs text-brand-navy font-semibold">{order.id}</td>
                            <td className="py-3 pr-4 font-medium text-gray-900 max-w-[140px] truncate">{order.product}</td>
                            <td className="py-3 pr-4 text-gray-600">{order.brand}</td>
                            <td className="py-3 pr-4 text-gray-500">{order.date}</td>
                            <td className="py-3 pr-4 font-semibold">{order.amount.toLocaleString()} EGP</td>
                            <td className="py-3 pr-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <button className="text-xs text-brand-navy hover:underline">Track</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">My Wishlist</h1>
                {wishlistItems.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                    <Heart className="mx-auto text-gray-300 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-4">Save products you love to find them later</p>
                    <Link to="/products" className="btn-primary">Browse Products</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlistItems.map(item => (
                      <Link key={item.id} to={`/product/${item.slug}`} className="bg-white rounded-2xl shadow-card p-4 hover:shadow-card-hover transition-all">
                        <div className="text-4xl mb-2 text-center">🛍️</div>
                        <p className="text-xs text-brand-gold font-semibold">{item.brandName}</p>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                        <p className="text-brand-navy font-bold mt-1">{item.price.toLocaleString()} EGP</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">My Reviews</h1>
                <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                  <Star className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You've written 8 reviews</h3>
                  <p className="text-gray-500">Your reviews help other shoppers make better decisions.</p>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">Profile Settings</h1>
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">{displayUser.name?.[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{displayUser.name}</p>
                      <p className="text-gray-500 text-sm">{displayUser.email}</p>
                      <button className="text-xs text-brand-gold hover:underline mt-1">Change photo</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'First Name', value: displayUser.name?.split(' ')[0], placeholder: 'First Name' },
                      { label: 'Last Name', value: displayUser.name?.split(' ')[1], placeholder: 'Last Name' },
                      { label: 'Email', value: displayUser.email, placeholder: 'Email' },
                      { label: 'Phone', value: displayUser.phone || '+20 10 0000 0000', placeholder: 'Phone' },
                    ].map(field => (
                      <div key={field.label}>
                        <label className="input-label">{field.label}</label>
                        <input defaultValue={field.value} placeholder={field.placeholder} className="input-field" />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => toast.success('Profile updated!', { style: { borderRadius: '12px' } })}
                    className="btn-primary mt-6"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Chat Support */}
            {activeTab === 'chat' && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">Chat Support</h1>
                <Link to="/chat" className="btn-primary inline-flex">Open Support Chat</Link>
              </div>
            )}

            {/* Generic tabs */}
            {['addresses', 'payment', 'notifications'].includes(activeTab) && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6 capitalize">{activeTab}</h1>
                <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                  <Settings className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">This section is coming soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
