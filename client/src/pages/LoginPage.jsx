import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { demoUser, demoSeller, demoAdmin } from '../data/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    // Demo accounts
    const accounts = {
      'nadia@example.com': { ...demoUser, password: 'password123' },
      'ahmed@luxorcrafts.com': { ...demoSeller, password: 'password123' },
      'admin@brandhive.com': { ...demoAdmin, password: 'admin123' },
    };

    const account = accounts[email.toLowerCase()];
    if (account && password.length >= 6) {
      const { password: _, ...userData } = account;
      login(userData);
      toast.success(`Welcome back, ${userData.name.split(' ')[0]}! 👋`, {
        style: { borderRadius: '12px' },
      });
      if (userData.role === 'admin') navigate('/admin/dashboard');
      else if (userData.role === 'seller') navigate('/seller/dashboard');
      else navigate(from);
    } else {
      toast.error('Invalid credentials. Try the demo accounts below.', {
        style: { borderRadius: '12px' },
      });
    }
    setLoading(false);
  };

  const quickLogin = (type) => {
    const map = {
      customer: { email: 'nadia@example.com', password: 'password123' },
      seller: { email: 'ahmed@luxorcrafts.com', password: 'password123' },
      admin: { email: 'admin@brandhive.com', password: 'admin123' },
    };
    setEmail(map[type].email);
    setPassword(map[type].password);
  };

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">B</span>
            </div>
            <span className="font-display font-bold text-brand-navy text-2xl">BrandHive</span>
          </Link>

          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your BrandHive account</p>

          {/* Quick login demo */}
          <div className="bg-brand-gold-pale border border-brand-gold/30 rounded-2xl p-4 mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-brand-gold" />
              Quick Demo Login
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { type: 'customer', label: '👤 Customer', color: 'bg-blue-100 text-blue-700' },
                { type: 'seller', label: '🏪 Seller', color: 'bg-amber-100 text-amber-700' },
                { type: 'admin', label: '⚙️ Admin', color: 'bg-purple-100 text-purple-700' },
              ].map(({ type, label, color }) => (
                <button
                  key={type}
                  onClick={() => quickLogin(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${color} hover:opacity-80 transition-opacity`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="input-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="input-label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-brand-gold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="input-field pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base mt-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Google', icon: '🟢' },
              { label: 'Facebook', icon: '🔵' },
            ].map(provider => (
              <button
                key={provider.label}
                onClick={() => toast('Social login coming soon!', { icon: '🔜', style: { borderRadius: '12px' } })}
                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {provider.icon} {provider.label}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-navy font-semibold hover:underline">
              Join BrandHive free
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 bg-brand-navy items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative z-10 text-center text-white p-12 max-w-md">
          <div className="text-7xl mb-6 animate-float">🏺</div>
          <h2 className="text-4xl font-display font-bold mb-4">
            Egypt's Finest<br />
            <span className="text-gradient-gold">Local Brands</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            Sign in to access your wishlist, track orders, and discover personalized recommendations from Egypt's top local brands.
          </p>
          <div className="flex items-center justify-center gap-2 text-brand-gold">
            <Shield size={14} />
            <span className="text-sm">256-bit SSL encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
