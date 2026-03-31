import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/CartContext';
import toast from 'react-hot-toast';

const CATEGORY_COLORS = {
  fashion: 'from-pink-200 to-rose-200',
  jewelry: 'from-amber-200 to-yellow-200',
  handmade: 'from-orange-200 to-amber-200',
  'home-decor': 'from-teal-200 to-cyan-200',
  organic: 'from-green-200 to-emerald-200',
  'art & culture': 'from-purple-200 to-violet-200',
  art: 'from-purple-200 to-violet-200',
  food: 'from-yellow-200 to-orange-200',
  beauty: 'from-fuchsia-200 to-pink-200',
  default: 'from-gray-100 to-gray-200',
};

const CATEGORY_ICONS = {
  fashion: '👗',
  jewelry: '💍',
  handmade: '🏺',
  'home-decor': '🏠',
  organic: '🌿',
  'art & culture': '🎨',
  art: '🎨',
  food: '🍯',
  beauty: '💄',
  default: '🛍️',
};

export default function ProductCard({ product, size = 'md' }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const catKey = product.category?.toLowerCase().replace(/\s+/g, '-');
  const bgGradient = CATEGORY_COLORS[catKey] || CATEGORY_COLORS.default;
  const icon = CATEGORY_ICONS[catKey] || CATEGORY_ICONS.default;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, { size: product.sizes?.[0], color: product.colors?.[0] });
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '12px', fontFamily: 'Inter' },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: wishlisted ? '💔' : '❤️',
      style: { borderRadius: '12px', fontFamily: 'Inter' },
    });
  };

  const isSmall = size === 'sm';

  return (
    <Link to={`/product/${product.slug}`} className="card-product block">
      {/* Image */}
      <div className={`relative product-img ${isSmall ? 'h-40' : 'h-52 md:h-60'} bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
        <span className={`${isSmall ? 'text-4xl' : 'text-6xl'} opacity-60`}>{icon}</span>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="badge-sale">-{product.discount}%</span>
          )}
          {product.isNew && (
            <span className="badge-new">NEW</span>
          )}
          {product.isFeatured && !product.discount && !product.isNew && (
            <span className="badge-featured">★</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
            wishlisted
              ? 'bg-red-500 text-white shadow-md scale-110'
              : 'bg-white/90 text-gray-500 hover:bg-white hover:text-red-500 shadow-sm'
          }`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2 bg-brand-navy text-white text-xs font-semibold rounded-xl hover:bg-opacity-90 transition-colors"
          >
            <ShoppingCart size={12} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={`p-3 ${isSmall ? '' : 'p-4'}`}>
        {/* Brand */}
        <div className="flex items-center gap-1 mb-1">
          <span className={`text-brand-gold text-xs font-semibold truncate`}>{product.brandName}</span>
          {product.verified && <span className="text-emerald-500 text-xs">✓</span>}
        </div>

        {/* Name */}
        <h3 className={`font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 ${isSmall ? 'text-xs' : 'text-sm'}`}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`font-bold text-brand-navy ${isSmall ? 'text-sm' : 'text-base'}`}>
              {product.price.toLocaleString()} EGP
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.freeShipping && (
            <span className="text-xs text-emerald-600 font-medium">Free ship</span>
          )}
        </div>

        {/* Governorate */}
        {!isSmall && (
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={10} className="text-gray-400" />
            <span className="text-xs text-gray-400">{product.governorate}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
