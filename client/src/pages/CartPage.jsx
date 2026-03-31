import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Minus, Plus, X, ArrowLeft, Tag, ChevronRight,
  Truck, Shield, RotateCcw, CreditCard, Smartphone, Banknote, Building2, CheckCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const STEPS = ['Cart', 'Delivery', 'Payment', 'Confirm'];
const PAYMENT_METHODS = [
  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Meeza' },
  { id: 'vodafone', icon: Smartphone, label: 'Vodafone Cash', sub: 'Mobile wallet payment' },
  { id: 'fawry', icon: Building2, label: 'Fawry', sub: 'Pay at any Fawry outlet' },
  { id: 'cod', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when you receive' },
];

const CATEGORY_ICONS = {
  Fashion: '👗', Jewelry: '💍', Handmade: '🏺', 'Home Decor': '🏠',
  Organic: '🌿', 'Art & Culture': '🎨', Food: '🍯', Beauty: '💄', default: '🛍️',
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [delivery, setDelivery] = useState({
    name: '', phone: '', street: '', governorate: 'Cairo', postalCode: '',
  });

  const shippingCost = subtotal >= 500 ? 0 : 50;
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost - discount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'BH2025') {
      setAppliedPromo('BH2025');
      toast.success('Promo code applied! 10% off 🎉', { style: { borderRadius: '12px' } });
    } else {
      toast.error('Invalid promo code', { style: { borderRadius: '12px' } });
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate('/account?tab=orders'), 3000);
  };

  const canProceedDelivery = delivery.name && delivery.phone && delivery.street && delivery.governorate;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-card-hover p-10 max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-emerald-600" size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Order Placed! 🎉</h2>
          <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
          <p className="text-gray-500 text-sm mb-8">Redirecting to your orders...</p>
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="page-container py-8">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-brand-navy' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? 'bg-emerald-500 text-white' :
                  i === step ? 'bg-brand-navy text-white shadow-md' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-brand-navy' : 'text-gray-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 transition-all ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Empty Cart */}
        {items.length === 0 && step === 0 && (
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Discover amazing Egyptian brands and products</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </div>
        )}

        {/* Step 0: Cart */}
        {step === 0 && items.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-gray-900">Your Cart ({itemCount} items)</h2>
                <Link to="/products" className="flex items-center gap-1 text-sm text-brand-gold hover:underline">
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>

              <div className="space-y-4">
                {items.map((item) => {
                  const icon = CATEGORY_ICONS[item.category] || CATEGORY_ICONS.default;
                  return (
                    <div key={item.key} className="bg-white rounded-2xl shadow-card p-4 flex gap-4">
                      {/* Image */}
                      <div className={`w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center text-4xl ${
                        item.category === 'Jewelry' ? 'bg-amber-50' :
                        item.category === 'Fashion' ? 'bg-pink-50' :
                        'bg-orange-50'
                      }`}>
                        {icon}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link to={`/brand/${item.brandSlug}`} className="text-xs text-brand-gold font-semibold hover:underline">
                              {item.brandName}
                            </Link>
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{item.name}</h3>
                            {item.options?.size && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.options.size}{item.options.color && ` · ${item.options.color}`}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity */}
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-bold border-x border-gray-200">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-bold text-brand-navy">
                            {(item.price * item.quantity).toLocaleString()} EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-5">Order Summary</h3>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">{subtotal.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={`font-semibold ${shippingCost === 0 ? 'text-emerald-600' : ''}`}>
                      {shippingCost === 0 ? 'Free' : `${shippingCost} EGP`}
                    </span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600">Discount ({appliedPromo})</span>
                      <span className="text-emerald-600 font-semibold">-{discount.toLocaleString()} EGP</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-brand-navy">{total.toLocaleString()} EGP</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="flex gap-2 mb-5">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Promo code..."
                      className="input-field pl-8 py-2.5 text-sm"
                    />
                  </div>
                  <button onClick={handlePromo} className="btn-primary py-2.5 text-sm px-4">
                    Apply
                  </button>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full btn-primary py-4 text-base"
                >
                  Proceed to Delivery <ChevronRight size={18} />
                </button>

                <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-400">
                  <Shield size={12} /> Secured · Stripe · 256-bit SSL
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Delivery */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Delivery Details</h2>
            <div className="bg-white rounded-2xl shadow-card p-6 space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Full Name</label>
                  <input value={delivery.name} onChange={e => setDelivery({...delivery, name: e.target.value})} placeholder="Nadia Mohamed" className="input-field" />
                </div>
                <div>
                  <label className="input-label">Phone Number</label>
                  <input value={delivery.phone} onChange={e => setDelivery({...delivery, phone: e.target.value})} placeholder="+20 10 0000 0000" className="input-field" />
                </div>
              </div>
              <div>
                <label className="input-label">Street Address</label>
                <input value={delivery.street} onChange={e => setDelivery({...delivery, street: e.target.value})} placeholder="5 Talaat Harb St, Downtown Cairo" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Governorate</label>
                  <select value={delivery.governorate} onChange={e => setDelivery({...delivery, governorate: e.target.value})} className="input-field">
                    {['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Port Said', 'Suez', 'Fayoum'].map(g => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="input-label">Postal Code</label>
                  <input value={delivery.postalCode} onChange={e => setDelivery({...delivery, postalCode: e.target.value})} placeholder="11511" className="input-field" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-ghost">← Back</button>
              <button
                onClick={() => canProceedDelivery && setStep(2)}
                disabled={!canProceedDelivery}
                className={`flex-1 btn-primary py-4 text-base ${!canProceedDelivery ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Continue to Payment →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Payment Method</h2>
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <div className="space-y-3">
                {PAYMENT_METHODS.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-brand-navy bg-brand-navy/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className="text-brand-navy"
                    />
                    <method.icon size={20} className="text-brand-navy flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
              <button onClick={() => setStep(3)} className="flex-1 btn-primary py-4 text-base">
                Review Order →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Review Your Order</h2>

            {/* Items summary */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
              {items.map(item => (
                <div key={item.key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{item.name} × {item.quantity}</span>
                  <span className="text-sm font-semibold">{(item.price * item.quantity).toLocaleString()} EGP</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-navy">{total.toLocaleString()} EGP</span>
              </div>
            </div>

            {/* Delivery summary */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Delivery To</h3>
              <p className="text-sm text-gray-700">{delivery.name}</p>
              <p className="text-sm text-gray-500">{delivery.phone}</p>
              <p className="text-sm text-gray-500">{delivery.street}, {delivery.governorate}</p>
            </div>

            {/* Payment summary */}
            <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
              <p className="text-sm text-gray-700">
                {PAYMENT_METHODS.find(m => m.id === selectedPayment)?.label}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost">← Back</button>
              <button onClick={handlePlaceOrder} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-base transition-colors">
                Place Order ✓
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
              <Shield size={11} /> Secured · Stripe · 256-bit SSL
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
