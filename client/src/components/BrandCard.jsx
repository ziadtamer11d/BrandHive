import { Link } from 'react-router-dom';
import { MapPin, Star, Package, Users, CheckCircle2 } from 'lucide-react';

export default function BrandCard({ brand, view = 'grid' }) {
  const gradient = brand.color || 'from-brand-navy to-blue-800';

  if (view === 'list') {
    return (
      <Link to={`/brand/${brand.slug}`} className="card flex items-center gap-4 p-4 hover:shadow-card-hover transition-all">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-lg">{brand.initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-gray-900 truncate">{brand.name}</h3>
            {brand.verified && (
              <span className="badge-verified">
                <CheckCircle2 size={10} />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <MapPin size={11} />
            {brand.location}
          </div>
          <p className="text-xs text-gray-500 line-clamp-1">{brand.description}</p>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
          <div className="text-center">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={12} fill="currentColor" />
              <span className="text-sm font-bold text-gray-900">{brand.rating}</span>
            </div>
            <span className="text-xs text-gray-400">Rating</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{brand.sales >= 1000 ? `${(brand.sales/1000).toFixed(1)}K` : brand.sales}</p>
            <span className="text-xs text-gray-400">Sales</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900">{brand.products}</p>
            <span className="text-xs text-gray-400">Products</span>
          </div>
        </div>

        <div className="text-brand-gold font-bold hidden sm:block">→</div>
      </Link>
    );
  }

  return (
    <Link to={`/brand/${brand.slug}`} className="card-brand block group">
      {/* Cover */}
      <div className={`-mx-6 -mt-6 mb-4 h-16 bg-gradient-to-r ${brand.coverColor || 'from-gray-100 to-gray-200'} rounded-t-2xl relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30`}></div>
        {brand.featured && (
          <div className="absolute top-2 right-2 bg-brand-gold text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 -mt-10 relative z-10 shadow-lg`}>
        <span className="text-white font-bold text-xl">{brand.initials}</span>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-gray-900 group-hover:text-brand-navy transition-colors">{brand.name}</h3>
        {brand.verified && (
          <span className="badge-verified flex-shrink-0">
            <CheckCircle2 size={10} />
            Verified
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <MapPin size={11} />
        {brand.location}
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{brand.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-gray-900">{brand.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Package size={12} className="text-gray-400" />
          <span className="text-xs text-gray-600">{brand.products} products</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <Users size={12} className="text-gray-400" />
          <span className="text-xs text-gray-600">
            {brand.followers >= 1000 ? `${(brand.followers/1000).toFixed(1)}K` : brand.followers}
          </span>
        </div>
      </div>
    </Link>
  );
}
