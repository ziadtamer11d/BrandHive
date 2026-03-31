import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle2, User, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [role, setRole] = useState('customer');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', governorate: 'Cairo', agreeTerms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error('Please fill in all required fields'); return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters'); return;
    }
    if (!form.agreeTerms) {
      toast.error('Please accept the terms & conditions'); return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const user = {
      id: `user-${Date.now()}`,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      role,
      governorate: form.governorate,
      joinDate: new Date().toISOString().split('T')[0],
    };

    login(user);
    toast.success(`Welcome to BrandHive, ${form.firstName}! 🎉`, {
      style: { borderRadius: '12px' },
      duration: 3000,
    });

    if (role === 'seller') navigate('/sell');
    else navigate('/');
    setLoading(false);
  };

  const perks = [
    '✅ Free to join — no monthly fees',
    '🛍️ Access 12,000+ verified Egyptian brands',
    '❤️ Save favorites to your wishlist',
    '📦 Track all your orders in one place',
    '🤖 Get AI-powered recommendations',
  ];

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Left - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-navy to-blue-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative z-10 text-white p-12 max-w-md">
          <div className="text-7xl mb-6 animate-float">🛍️</div>
          <h2 className="text-4xl font-display font-bold mb-4">
            Join<br />
            <span className="text-gradient-gold">BrandHive</span>
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Become part of Egypt's largest local brand community. Shop, discover, and support Egyptian entrepreneurs.
          </p>
          <div className="space-y-3">
            {perks.map(perk => (
              <div key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">B</span>
            </div>
            <span className="font-display font-bold text-brand-navy text-2xl">BrandHive</span>
          </Link>

          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 mb-6">Join 500,000+ buyers on Egypt's top marketplace</p>

          {/* Role Toggle */}
          <div className="flex gap-3 mb-6">
            {[
              { value: 'customer', label: 'I\'m a Buyer', icon: User },
              { value: 'seller', label: 'I\'m a Seller', icon: Store },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setRole(value)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                  role === value
                    ? 'border-brand-navy bg-brand-navy/5 text-brand-navy'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="input-label">First Name *</label>
                <input value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Ahmed" className="input-field" />
              </div>
              <div>
                <label className="input-label">Last Name *</label>
                <input value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Hassan" className="input-field" />
              </div>
            </div>

            <div>
              <label className="input-label">Email Address *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" className="input-field" />
            </div>

            <div>
              <label className="input-label">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+20 10 0000 0000" className="input-field" />
            </div>

            <div>
              <label className="input-label">Governorate</label>
              <select value={form.governorate} onChange={e => update('governorate', e.target.value)} className="input-field">
                {['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Port Said', 'Suez', 'Fayoum', 'Mansoura', 'Tanta'].map(g => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="input-label">Password *</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="At least 6 characters"
                  className="input-field pr-11"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="input-label">Confirm Password *</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={e => update('confirmPassword', e.target.value)}
                placeholder="Repeat your password"
                className={`input-field ${form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-300 focus:border-red-400' : ''}`}
              />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
              )}
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={e => update('agreeTerms', e.target.checked)}
                className="mt-1 rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
              />
              <span className="text-sm text-gray-600">
                I agree to BrandHive's{' '}
                <Link to="/terms" className="text-brand-navy font-medium hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-brand-navy font-medium hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-base disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-navy font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
