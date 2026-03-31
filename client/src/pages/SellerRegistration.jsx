import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Upload, CheckCircle, Store, BarChart3, Users, MessageSquare, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const STEPS = [
  { num: 1, label: 'Basic Information' },
  { num: 2, label: 'Brand Setup' },
  { num: 3, label: 'Verify' },
];

const PERKS = [
  { icon: ShoppingBag, title: 'Reach 500K+ Buyers', desc: "Egypt's largest local shopping audience instantly" },
  { icon: BarChart3, title: 'Just 5% Commission', desc: 'No monthly fees — only pay when you sell' },
  { icon: Store, title: 'Create Your Bazaar', desc: 'Your own branded mini-storefront on BrandHive' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Sales, traffic, orders — all in one dashboard' },
  { icon: MessageSquare, title: '24/7 Support', desc: 'Dedicated Arabic & English support team' },
];

export default function SellerRegistration() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Step 1
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    // Step 2
    brandName: '',
    governorate: 'Cairo',
    businessType: 'Individual Seller',
    description: '',
    logoFile: null,
    categories: [],
    // Step 3
    nationalId: '',
    taxId: '',
    agreeTerms: false,
  });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleNext = () => {
    if (step === 1) {
      if (!form.firstName || !form.lastName || !form.email || !form.phone) {
        toast.error('Please fill in all required fields'); return;
      }
    }
    if (step === 2) {
      if (!form.brandName || !form.description) {
        toast.error('Brand name and description are required'); return;
      }
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreeTerms) { toast.error('Please accept the terms'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));

    const updatedUser = {
      ...(user || {}),
      id: user?.id || `seller-${Date.now()}`,
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      role: 'seller',
      brandName: form.brandName,
      sellerApproved: false, // pending review
    };
    login(updatedUser);

    toast.success('Application submitted! We\'ll review it within 24 hours. 🎉', {
      style: { borderRadius: '12px' },
      duration: 4000,
    });
    navigate('/seller/dashboard');
    setLoading(false);
  };

  const businessTypes = ['Individual Seller', 'Small Business', 'Registered Company', 'Artisan / Craftsperson', 'Farm / Agricultural'];
  const catOptions = ['Fashion', 'Jewelry', 'Handmade', 'Home Decor', 'Organic', 'Art & Culture', 'Books', 'Food & Drink', 'Beauty'];

  const toggleCat = (cat) => {
    setForm(p => ({
      ...p,
      categories: p.categories.includes(cat) ? p.categories.filter(c => c !== cat) : [...p.categories, cat]
    }));
  };

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Left Sidebar - Benefits */}
      <div className="hidden lg:flex lg:w-[420px] bg-brand-navy flex-col justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">B</span>
            </div>
            <span className="text-white font-display font-bold text-2xl">BrandHive</span>
          </Link>

          <p className="text-brand-gold text-sm font-semibold uppercase tracking-wider mb-3">Already selling?</p>
          <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Join Egypt's #1<br />Marketplace
          </h2>
          <p className="text-gray-300 mb-8">
            Start selling to 500K+ buyers across Egypt and beyond.
          </p>

          <div className="space-y-5">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-gray-400 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-brand-navy rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-bold">B</span>
            </div>
            <span className="font-display font-bold text-brand-navy text-xl">BrandHive</span>
          </Link>

          {/* Already selling hint */}
          <div className="flex justify-end mb-4">
            <Link to="/login" className="text-sm text-gray-500 hover:text-brand-navy">
              Already selling? <span className="font-semibold text-brand-navy">Sign in</span>
            </Link>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 transition-all ${step >= s.num ? 'text-brand-navy' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step > s.num ? 'bg-emerald-500 text-white' :
                    step === s.num ? 'bg-brand-navy text-white' : 'bg-gray-200'
                  }`}>
                    {step > s.num ? <CheckCircle size={14} /> : s.num}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step === s.num ? 'text-brand-navy' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 transition-all ${step > s.num ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">
            Create Your Seller Account
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Step {step} of {STEPS.length} · {STEPS[step - 1].label}
          </p>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
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
                <label className="input-label">Phone Number *</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+20 10 0000 0000" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="input-label">Governorate</label>
                  <select value={form.governorate} onChange={e => update('governorate', e.target.value)} className="input-field">
                    {['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Fayoum', 'Mansoura', 'Tanta'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="input-label">Business Type</label>
                  <select value={form.businessType} onChange={e => update('businessType', e.target.value)} className="input-field">
                    {businessTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Brand Setup */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="input-label">Brand Name *</label>
                <input
                  value={form.brandName}
                  onChange={e => update('brandName', e.target.value)}
                  placeholder="Your brand name in English"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Brand Description *</label>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="Tell customers your story — what you make and why..."
                  className="input-field h-28 resize-none"
                />
              </div>

              <div>
                <label className="input-label">Categories (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {catOptions.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCat(cat)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all ${
                        form.categories.includes(cat)
                          ? 'border-brand-navy bg-brand-navy text-white'
                          : 'border-gray-200 text-gray-600 hover:border-brand-navy/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="input-label">Brand Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-navy transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Drop your logo here or click to browse</p>
                  <p className="text-xs text-gray-400">PNG · JPG · SVG · up to 5MB</p>
                  <input type="file" accept="image/*" className="hidden" onChange={e => update('logoFile', e.target.files[0])} />
                </div>
                {form.logoFile && (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle size={12} /> {form.logoFile.name} uploaded
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Verify */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-brand-gold-pale border border-brand-gold/30 rounded-2xl p-4 mb-2">
                <h3 className="font-semibold text-gray-800 mb-1">🔒 Identity Verification</h3>
                <p className="text-sm text-gray-600">This information is required for seller verification and payouts. It's kept secure and private.</p>
              </div>

              <div>
                <label className="input-label">National ID Number</label>
                <input
                  value={form.nationalId}
                  onChange={e => update('nationalId', e.target.value)}
                  placeholder="Enter your national ID"
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Tax Registration Number (optional)</label>
                <input
                  value={form.taxId}
                  onChange={e => update('taxId', e.target.value)}
                  placeholder="If applicable"
                  className="input-field"
                />
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-card p-5">
                <h4 className="font-semibold text-gray-900 mb-3">Application Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{form.firstName} {form.lastName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Brand</span><span className="font-medium">{form.brandName || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium">{form.businessType}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-medium">{form.governorate}</span></div>
                </div>
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
                  <Link to="/terms" className="text-brand-navy font-medium hover:underline">Seller Terms</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-brand-navy font-medium hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-base disabled:opacity-70">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <>Submit Application <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          )}

          {/* Navigation buttons (non-final steps) */}
          {step < 3 && (
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button onClick={handleNext} className="flex-1 btn-primary py-4">
                {step === 2 ? 'Continue to Verify' : 'Continue to Brand Setup'} <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step > 1 && step < 3 && (
            <button
              onClick={() => toast.success('Draft saved!', { style: { borderRadius: '12px' } })}
              className="w-full text-center text-sm text-gray-500 hover:text-brand-navy transition-colors mt-3 py-2"
            >
              Save Draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
