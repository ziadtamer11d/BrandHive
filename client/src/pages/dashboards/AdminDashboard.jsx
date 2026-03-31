import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Store, Package, DollarSign, Search as SearchIcon,
  Flag, Target, Settings, Bell, FileText, LogOut, CheckCircle, X, Eye,
  TrendingUp, ShoppingBag, AlertTriangle, BarChart3, ChevronDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const monthlyData = [
  { month: 'Sep', gmv: 1800000, orders: 12000 },
  { month: 'Oct', gmv: 2100000, orders: 14200 },
  { month: 'Nov', gmv: 1950000, orders: 13100 },
  { month: 'Dec', gmv: 2800000, orders: 18900 },
  { month: 'Jan', gmv: 2200000, orders: 15000 },
  { month: 'Feb', gmv: 2350000, orders: 15900 },
  { month: 'Mar', gmv: 2400000, orders: 18240 },
];

const pendingSellers = [
  { id: 1, seller: 'Amira S.', brand: 'Desert Rose Textiles', category: 'Fashion', location: 'Assiut', submitted: 'Mar 9, 2025' },
  { id: 2, seller: 'Bassem K.', brand: 'Nubian Colors', category: 'Art', location: 'Aswan', submitted: 'Mar 8, 2025' },
  { id: 3, seller: 'Yasmine T.', brand: 'Cairo Clay Studio', category: 'Pottery', location: 'New Cairo', submitted: 'Mar 7, 2025' },
  { id: 4, seller: 'Kareem N.', brand: 'Nile Textiles Co.', category: 'Handmade', location: 'Alexandria', submitted: 'Mar 6, 2025' },
];

const categoryData = [
  { name: 'Fashion', value: 35 },
  { name: 'Jewelry', value: 18 },
  { name: 'Handmade', value: 22 },
  { name: 'Home Decor', value: 15 },
  { name: 'Organic', value: 10 },
];

const COLORS = ['#1A2040', '#C8922A', '#7C3AED', '#06B6D4', '#84CC16'];

function SidebarItem({ icon: Icon, label, tab, activeTab, setActiveTab, badge }) {
  return (
    <button onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'sidebar-item-active' : 'sidebar-item'}>
      <Icon size={16} />
      <span>{label}</span>
      {badge > 0 && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
      )}
    </button>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sellers, setSellers] = useState(pendingSellers);

  const approveSeller = (id) => {
    setSellers(prev => prev.filter(s => s.id !== id));
    toast.success('Seller approved and notified!', { icon: '✅', style: { borderRadius: '12px' } });
  };

  const rejectSeller = (id) => {
    setSellers(prev => prev.filter(s => s.id !== id));
    toast.error('Seller application rejected.', { style: { borderRadius: '12px' } });
  };

  const navSections = [
    {
      label: 'Platform',
      items: [
        { icon: LayoutDashboard, label: 'Overview', tab: 'overview' },
        { icon: Users, label: 'Users', tab: 'users' },
        { icon: Store, label: 'Sellers', tab: 'sellers', badge: sellers.length },
        { icon: Package, label: 'Orders', tab: 'orders' },
        { icon: DollarSign, label: 'Revenue', tab: 'revenue' },
      ],
    },
    {
      label: 'Moderation',
      items: [
        { icon: SearchIcon, label: 'Review Products', tab: 'products' },
        { icon: Flag, label: 'Reports', tab: 'reports' },
        { icon: Target, label: 'Featured Slots', tab: 'featured' },
      ],
    },
    {
      label: 'System',
      items: [
        { icon: Settings, label: 'Settings', tab: 'settings' },
        { icon: Bell, label: 'Notifications', tab: 'notifications' },
        { icon: FileText, label: 'Audit Log', tab: 'audit' },
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
              {/* Admin badge */}
              <div className="flex items-center gap-2 p-3 mb-4 bg-brand-navy/5 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Admin Console</p>
                  <p className="text-xs text-emerald-600">● Active</p>
                </div>
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
                <button onClick={() => { logout(); navigate('/'); }} className="sidebar-item text-red-500 hover:bg-red-50 w-full">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-display font-bold text-gray-900">Admin Console</h1>
                    <p className="text-gray-500 mt-0.5">Real-time platform metrics — March 10, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-ghost text-sm flex items-center gap-1">
                      📤 Export
                    </button>
                    <button className="btn-primary text-sm flex items-center gap-1">
                      🔍 Run Report
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Users, label: 'Registered Users', value: '284K', change: '+2.4%', color: 'bg-blue-100 text-blue-600', trend: '↑' },
                    { icon: Store, label: 'Active Sellers', value: '12,480', change: '+156', color: 'bg-emerald-100 text-emerald-600', trend: '↑' },
                    { icon: DollarSign, label: 'GMV (Mar)', value: '2.4M EGP', change: '+18%', color: 'bg-amber-100 text-amber-600', trend: '↑' },
                    { icon: Package, label: 'Orders This Month', value: '18,240', change: '+22%', color: 'bg-purple-100 text-purple-600', trend: '↑' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon size={18} />
                      </div>
                      <div className="text-2xl font-display font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                      <div className="text-xs text-emerald-600 font-semibold mt-1">{stat.trend} {stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                  {/* GMV Chart */}
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6">
                    <h3 className="font-display font-bold text-gray-900 mb-4">GMV & Orders — Last 7 Months</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <Tooltip
                          formatter={(v, n) => [n === 'gmv' ? `${(v/1000000).toFixed(1)}M EGP` : v.toLocaleString(), n === 'gmv' ? 'GMV' : 'Orders']}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="gmv" fill="#1A2040" radius={[6, 6, 0, 0]} name="gmv" />
                        <Bar dataKey="orders" fill="#C8922A" radius={[6, 6, 0, 0]} name="orders" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Category Breakdown */}
                  <div className="bg-white rounded-2xl shadow-card p-6">
                    <h3 className="font-display font-bold text-gray-900 mb-4">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                          {categoryData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ borderRadius: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5 mt-2">
                      {categoryData.map((item, i) => (
                        <div key={item.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="text-gray-600">{item.name}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pending Seller Approvals */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-gray-900">
                      Pending Seller Approvals
                      <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold">
                        {sellers.length} awaiting review
                      </span>
                    </h3>
                  </div>

                  {sellers.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto text-emerald-400 mb-2" size={40} />
                      <p className="text-gray-500">All caught up! No pending approvals.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            {['Seller', 'Brand', 'Category', 'Location', 'Submitted', 'Action'].map(h => (
                              <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sellers.map(seller => (
                            <tr key={seller.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                              <td className="py-3 pr-4 font-medium text-gray-900">{seller.seller}</td>
                              <td className="py-3 pr-4 font-semibold text-brand-navy">{seller.brand}</td>
                              <td className="py-3 pr-4 text-gray-600">{seller.category}</td>
                              <td className="py-3 pr-4 text-gray-500">{seller.location}</td>
                              <td className="py-3 pr-4 text-gray-500">{seller.submitted}</td>
                              <td className="py-3">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => approveSeller(seller.id)}
                                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                  >
                                    <CheckCircle size={12} /> Approve
                                  </button>
                                  <button
                                    onClick={() => rejectSeller(seller.id)}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                                  >
                                    <Eye size={12} /> Review
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Other tabs */}
            {['users', 'sellers', 'orders', 'revenue', 'products', 'reports', 'featured', 'settings', 'notifications', 'audit'].includes(activeTab) && (
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-6 capitalize">{activeTab}</h1>
                <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                  <BarChart3 className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">This section is available in the full admin version.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
