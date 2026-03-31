import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Store, Package, ShoppingBag, DollarSign, Target, Star, Megaphone,
  Settings, MessageSquare, CreditCard, LogOut, TrendingUp, Eye, Users,
  Plus, ArrowUpRight, BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { demoSeller } from '../../data/mockData';
import toast from 'react-hot-toast';

const revenueData = [
  { month: 'Sep', revenue: 12400 },
  { month: 'Oct', revenue: 15800 },
  { month: 'Nov', revenue: 14200 },
  { month: 'Dec', revenue: 19600 },
  { month: 'Jan', revenue: 16800 },
  { month: 'Feb', revenue: 17200 },
  { month: 'Mar', revenue: 18540 },
];

const recentOrders = [
  { id: '#8821', customer: 'Nadia M.', product: 'Pharaonic Vase × 1', amount: 850, date: 'Mar 8', status: 'Shipped' },
  { id: '#8819', customer: 'Karim A.', product: 'Bastet Figurine × 2', amount: 1300, date: 'Mar 7', status: 'Delivered' },
  { id: '#8810', customer: 'Sara H.', product: 'Oil Lamp Set', amount: 640, date: 'Mar 6', status: 'Pending' },
  { id: '#8804', customer: 'Omar S.', product: 'Pyramid Miniatures', amount: 480, date: 'Mar 5', status: 'Shipped' },
];

const topProducts = [
  { name: 'Pharaonic Vase', percent: 82 },
  { name: 'Ceramic Oil Lamp', percent: 65 },
  { name: 'Bastet Figurine', percent: 48 },
];

const STATUS_COLORS = {
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Processing: 'bg-gray-100 text-gray-600',
};

function SidebarItem({ icon: Icon, label, tab, activeTab, setActiveTab }) {
  const isActive = activeTab === tab;
  return (
    <button onClick={() => setActiveTab(tab)} className={isActive ? 'sidebar-item-active' : 'sidebar-item'}>
      <Icon size={17} />
      <span>{label}</span>
    </button>
  );
}

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const brandName = user?.brandName || demoSeller.brandName;

  const handleLogout = () => { logout(); navigate('/'); };

  const navSections = [
    {
      label: 'Overview',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard' },
        { icon: Store, label: 'My Bazaar', tab: 'bazaar' },
        { icon: Package, label: 'Orders', tab: 'orders' },
        { icon: ShoppingBag, label: 'Products', tab: 'products' },
        { icon: DollarSign, label: 'Revenue', tab: 'revenue' },
      ],
    },
    {
      label: 'Marketing',
      items: [
        { icon: Target, label: 'Promotions', tab: 'promotions' },
        { icon: Star, label: 'Reviews', tab: 'reviews' },
        { icon: Megaphone, label: 'Ads Manager', tab: 'ads' },
      ],
    },
    {
      label: 'Account',
      items: [
        { icon: Settings, label: 'Shop Settings', tab: 'settings' },
        { icon: MessageSquare, label: 'Messages', tab: 'messages' },
        { icon: CreditCard, label: 'Payouts', tab: 'payouts' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="page-container py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-4 sticky top-24">
              {/* Brand info */}
              <div className="p-3 mb-4 bg-brand-cream rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-brand-navy flex items-center justify-center">
                    <span className="text-white text-xs font-bold">LC</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{brandName}</p>
                    <p className="text-xs text-emerald-600">● Online</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Seller Portal</p>
              </div>

              {navSections.map(section => (
                <div key={section.label} className="mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 mb-2">{section.label}</p>
                  {section.items.map(item => (
                    <SidebarItem key={item.tab} {...item} activeTab={activeTab} setActiveTab={setActiveTab} />
                  ))}
                </div>
              ))}

              <div className="border-t border-gray-100 pt-3">
                <button onClick={handleLogout} className="sidebar-item text-red-500 hover:bg-red-50 w-full">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-display font-bold text-gray-900">Seller Portal</h1>
                    <p className="text-gray-500 mt-0.5">Performance — March 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toast('Opening bazaar...', { icon: '🏪', style: { borderRadius: '12px' } })}
                      className="btn-ghost text-sm"
                    >
                      View Bazaar →
                    </button>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="btn-primary text-sm flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Product
                    </button>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  {[
                    { icon: DollarSign, label: 'Revenue (EGP)', value: '18,540', change: '+22%', color: 'bg-emerald-100 text-emerald-600' },
                    { icon: Package, label: 'Orders This Month', value: '124', change: '+15%', color: 'bg-blue-100 text-blue-600' },
                    { icon: Eye, label: 'Bazaar Views', value: '8,240', change: '+8%', color: 'bg-purple-100 text-purple-600' },
                    { icon: Users, label: 'Followers', value: '2.4K', change: '+0.1K', color: 'bg-amber-100 text-amber-600' },
                    { icon: Star, label: 'Avg Rating', value: '4.9', change: '+0.1', color: 'bg-rose-100 text-rose-600' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-2xl shadow-card p-4">
                      <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon size={16} />
                      </div>
                      <div className="text-xl font-display font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                      <div className="text-xs text-emerald-600 font-semibold mt-1">{stat.change}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                  {/* Revenue Chart */}
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-gray-900">Revenue — Last 7 Months</h3>
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">+22% vs last month</span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={revenueData} barSize={24}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <Tooltip
                          formatter={(v) => [`${v.toLocaleString()} EGP`]}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="revenue" fill="#1A2040" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Products + Metrics */}
                  <div className="bg-white rounded-2xl shadow-card p-6">
                    <h3 className="font-display font-bold text-gray-900 mb-4">Bazaar Health</h3>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: 'Completion Rate', value: '94%', color: 'bg-emerald-500' },
                        { label: 'Response Rate', value: '98%', color: 'bg-blue-500' },
                        { label: 'Platform Rank', value: 'Top 5%', color: 'bg-brand-gold' },
                      ].map(m => (
                        <div key={m.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{m.label}</span>
                            <span className="font-semibold text-gray-900">{m.value}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${m.color} rounded-full`} style={{ width: m.value.includes('%') ? m.value : '80%' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Top Products</h4>
                    {topProducts.map(p => (
                      <div key={p.name} className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-600 flex-1 truncate">{p.name}</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-gold rounded-full" style={{ width: `${p.percent}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{p.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-gray-900">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-sm text-brand-gold hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {['Order', 'Customer', 'Product', 'Amount', 'Date', 'Status'].map(h => (
                            <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                            <td className="py-3 pr-4 font-mono text-xs text-brand-navy font-semibold">{order.id}</td>
                            <td className="py-3 pr-4 font-medium">{order.customer}</td>
                            <td className="py-3 pr-4 text-gray-600 max-w-[140px] truncate">{order.product}</td>
                            <td className="py-3 pr-4 font-semibold">{order.amount.toLocaleString()} EGP</td>
                            <td className="py-3 pr-4 text-gray-500">{order.date}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
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

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-display font-bold text-gray-900">My Products</h1>
                  <button className="btn-primary text-sm flex items-center gap-1">
                    <Plus size={14} /> Add Product
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-card p-6 text-center py-12">
                  <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">Product management coming in full version.</p>
                </div>
              </div>
            )}

            {/* Generic tabs */}
            {['bazaar', 'orders', 'revenue', 'promotions', 'reviews', 'ads', 'settings', 'messages', 'payouts'].includes(activeTab) && activeTab !== 'products' && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6 capitalize">{activeTab}</h1>
                <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                  <BarChart3 className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">This section is available in the full version.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
