import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Heart, ShoppingCart, ArrowLeft, Share2, Truck, RotateCcw,
  Shield, CheckCircle2, MapPin, Package, MessageSquare, Minus, Plus, ChevronRight
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, reviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/CartContext';
import toast from 'react-hot-toast';

const CATEGORY_ICONS = {
  Fashion: '👗', Jewelry: '💍', Handmade: '🏺', 'Home Decor': '🏠',
  Organic: '🌿', 'Art & Culture': '🎨', Food: '🍯', Beauty: '💄',
};

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link to="/products" className="btn-primary mt-4">Browse Products</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const icon = CATEGORY_ICONS[product.category] || '🛍️';
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      size: product.sizes?.[selectedSize],
      color: product.colors?.[selectedColor],
    });
    toast.success('Added to cart!', { icon: '🛒', style: { borderRadius: '12px' } });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      size: product.sizes?.[selectedSize],
      color: product.colors?.[selectedColor],
    });
    navigate('/cart');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: wishlisted ? '💔' : '❤️',
      style: { borderRadius: '12px' },
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="page-container py-3 text-sm text-gray-500 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-brand-navy">Home</Link>
          <ChevronRight size={13} />
          <Link to={`/products?category=${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-brand-navy capitalize">
            {product.category}
          </Link>
          <ChevronRight size={13} />
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main image */}
            <div className={`aspect-square rounded-3xl bg-gradient-to-br ${
              product.category === 'Jewelry' ? 'from-amber-100 to-yellow-200' :
              product.category === 'Fashion' ? 'from-pink-100 to-rose-200' :
              product.category === 'Organic' ? 'from-green-100 to-emerald-200' :
              'from-orange-100 to-amber-200'
            } flex items-center justify-center mb-3 relative overflow-hidden`}>
              <span className="text-9xl">{icon}</span>
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  -{product.discount}%
                </div>
              )}
              <button
                onClick={handleWishlist}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all ${
                  wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                    activeImg === i
                      ? 'bg-brand-navy/10 ring-2 ring-brand-navy'
                      : 'bg-white shadow-sm hover:shadow-card'
                  }`}
                >
                  <span className="text-3xl opacity-60">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Brand */}
            <Link to={`/brand/${product.brandSlug}`} className="flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-xl bg-brand-navy flex items-center justify-center">
                <span className="text-white text-xs font-bold">{product.brandName[0]}</span>
              </div>
              <span className="font-semibold text-brand-gold group-hover:underline">{product.brandName}</span>
              {product.verified && <CheckCircle2 size={14} className="text-emerald-500" />}
              <span className="text-gray-400 text-sm">· Visit Bazaar →</span>
            </Link>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-500 text-sm">· {product.reviews} reviews</span>
              <span className="text-gray-500 text-sm">· {product.sold} sold</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-display font-bold text-brand-navy">
                {product.price.toLocaleString()} EGP
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">{product.originalPrice.toLocaleString()}</span>
                  <span className="text-emerald-600 font-semibold">Save {Math.round((1 - product.price/product.originalPrice) * 100)}%</span>
                </>
              )}
            </div>

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedSize === i
                          ? 'border-brand-navy bg-brand-navy text-white'
                          : 'border-gray-200 bg-white hover:border-brand-navy text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Color: <span className="font-normal text-gray-600">{product.colors[selectedColor]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                        selectedColor === i
                          ? 'border-brand-navy bg-brand-navy/10 text-brand-navy'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-5 py-2.5 font-bold text-gray-900 text-lg border-x-2 border-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    className="px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-bold transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-orange-600 font-medium">
                  {product.inStock <= 10 && `Only ${product.inStock} left in stock`}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart} className="flex-1 btn-outline flex items-center justify-center gap-2 py-3.5">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="flex-1 btn-primary flex items-center justify-center gap-2 py-3.5 bg-brand-gold hover:opacity-90 shadow-gold">
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, label: 'Free delivery', sub: '500+ EGP', color: 'text-emerald-500' },
                { icon: RotateCcw, label: '14-day returns', sub: 'Easy returns', color: 'text-blue-500' },
                { icon: Shield, label: 'Secure payment', sub: '256-bit SSL', color: 'text-purple-500' },
              ].map(({ icon: Icon, label, sub, color }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 bg-white rounded-xl shadow-sm">
                  <Icon size={18} className={color} />
                  <span className="text-xs font-semibold text-gray-700 mt-1">{label}</span>
                  <span className="text-xs text-gray-400">{sub}</span>
                </div>
              ))}
            </div>

            {/* Seller info */}
            <Link to={`/brand/${product.brandSlug}`} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm hover:shadow-card transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{product.brandName[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{product.brandName}</span>
                  {product.verified && <CheckCircle2 size={13} className="text-emerald-500" />}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={11} />
                  <span>{product.governorate}</span>
                  <span>·</span>
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span>4.9</span>
                  <span>·</span>
                  <span>840 sales</span>
                </div>
              </div>
              <span className="text-brand-gold font-medium text-sm">Visit Bazaar →</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-10">
          <div className="flex border-b border-gray-100">
            {['description', 'reviews', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab ? 'border-brand-navy text-brand-navy' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-brand-cream text-brand-navy text-sm rounded-full font-medium">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <div className="flex justify-center my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">{product.reviews} reviews</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {productReviews.length > 0 ? productReviews.map(review => (
                    <div key={review.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{review.userName[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{review.userName}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 ml-11">{review.comment}</p>
                    </div>
                  )) : (
                    <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                {[
                  { title: 'Delivery', icon: '🚚', text: 'Ships within 3–5 business days. Free delivery on orders above 500 EGP.' },
                  { title: 'Returns', icon: '↩️', text: '14-day return policy. Items must be unused and in original packaging.' },
                  { title: 'Payment', icon: '💳', text: 'Credit/debit cards, Vodafone Cash, Fawry, and Cash on Delivery accepted.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900">You May Also Like</h2>
              <Link to={`/products?category=${product.category.toLowerCase()}`} className="btn-ghost text-sm">
                See all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
