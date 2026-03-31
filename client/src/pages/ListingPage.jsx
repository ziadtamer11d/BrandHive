import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, LayoutGrid, List, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, governorates } from '../data/mockData';

const SORT_OPTIONS = ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest', 'Most Reviewed'];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-3"
      >
        {title}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && children}
    </div>
  );
}

export default function ListingPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const [sort, setSort] = useState('Best Match');
  const [view, setView] = useState('grid4');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters state
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedGovs, setSelectedGovs] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [filters, setFilters] = useState({
    freeShipping: false,
    onSale: false,
    verifiedOnly: false,
    customizable: false,
  });

  const categoryLabel = categories.find(c => c.slug === categoryParam)?.name || categoryParam;
  const activeCategory = categoryLabel || '';

  const toggleGov = (gov) => {
    setSelectedGovs(prev => prev.includes(gov) ? prev.filter(g => g !== gov) : [...prev, gov]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (activeCategory) {
      result = result.filter(p =>
        p.category.toLowerCase() === activeCategory.toLowerCase() ||
        p.category.toLowerCase().includes(categoryParam.toLowerCase())
      );
    }

    if (priceMin) result = result.filter(p => p.price >= parseInt(priceMin));
    if (priceMax) result = result.filter(p => p.price <= parseInt(priceMax));
    if (selectedGovs.length) result = result.filter(p => selectedGovs.includes(p.governorate));
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    if (filters.freeShipping) result = result.filter(p => p.freeShipping);
    if (filters.onSale) result = result.filter(p => p.discount > 0);
    if (filters.verifiedOnly) result = result.filter(p => p.verified);
    if (filters.customizable) result = result.filter(p => p.customizable);

    switch (sort) {
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break;
      case 'Top Rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'Most Reviewed': result.sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [searchParam, activeCategory, priceMin, priceMax, selectedGovs, minRating, filters, sort]);

  const clearAll = () => {
    setPriceMin('');
    setPriceMax('');
    setSelectedGovs([]);
    setMinRating(0);
    setFilters({ freeShipping: false, onSale: false, verifiedOnly: false, customizable: false });
  };

  const govCounts = {};
  products.forEach(p => { govCounts[p.governorate] = (govCounts[p.governorate] || 0) + 1; });
  const topGovs = Object.entries(govCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const gridClass = view === 'grid4'
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
    : view === 'grid2'
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
      : 'flex flex-col gap-4';

  const SidebarContent = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Filters</h2>
        <button onClick={clearAll} className="text-xs text-brand-gold hover:underline">Clear All</button>
      </div>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            placeholder="Min"
            className="input-field py-2 text-sm"
          />
          <span className="text-gray-400 text-sm">—</span>
          <input
            type="number"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            placeholder="Max"
            className="input-field py-2 text-sm"
          />
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {[['0–200', 0, 200], ['200–500', 200, 500], ['500–1K', 500, 1000], ['1K+', 1000, '']].map(([label, min, max]) => (
            <button
              key={label}
              onClick={() => { setPriceMin(min.toString()); setPriceMax(max.toString()); }}
              className="px-3 py-1 text-xs rounded-lg bg-gray-100 hover:bg-brand-navy hover:text-white transition-colors"
            >
              {label} EGP
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Governorate">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {topGovs.map(([gov, count]) => (
            <label key={gov} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGovs.includes(gov)}
                onChange={() => toggleGov(gov)}
                className="rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
              />
              <span className="text-sm text-gray-700 flex-1">{gov}</span>
              <span className="text-xs text-gray-400">{count.toLocaleString()}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-2">
          {[5, 4, 3].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="text-brand-navy focus:ring-brand-navy"
              />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < r ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-xs text-gray-500">& up</span>
            </label>
          ))}
          {minRating > 0 && (
            <button onClick={() => setMinRating(0)} className="text-xs text-red-500 hover:underline">Clear</button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Special">
        <div className="space-y-2">
          {[
            { key: 'freeShipping', label: '🚚 Free Shipping' },
            { key: 'onSale', label: '🏷️ On Sale' },
            { key: 'verifiedOnly', label: '✅ Verified Sellers Only' },
            { key: 'customizable', label: '✨ Customizable' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={() => setFilters(prev => ({ ...prev, [key]: !prev[key] }))}
                className="rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="page-container py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-navy">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="hover:text-brand-navy">Categories</Link>
          {activeCategory && (
            <>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">{activeCategory}</span>
            </>
          )}
          {searchParam && (
            <>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">Search: "{searchParam}"</span>
            </>
          )}
        </div>
      </div>

      <div className="page-container py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900">
                  {searchParam ? `Results for "${searchParam}"` : activeCategory ? activeCategory : 'All Products'}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Showing {filteredProducts.length.toLocaleString()} results
                  {activeCategory && ` in ${activeCategory}`}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:border-brand-navy transition-colors"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                </button>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="input-field py-2.5 text-sm w-44"
                >
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>

                {/* View */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
                  {[
                    { key: 'grid4', icon: <LayoutGrid size={15} /> },
                    { key: 'grid2', icon: <Grid3X3 size={15} /> },
                    { key: 'list', icon: <List size={15} /> },
                  ].map(v => (
                    <button
                      key={v.key}
                      onClick={() => setView(v.key)}
                      className={`p-2 rounded-lg transition-all ${view === v.key ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {v.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filters */}
            {(priceMin || priceMax || selectedGovs.length > 0 || minRating > 0 || Object.values(filters).some(Boolean)) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-gray-500 font-medium">Active:</span>
                {priceMin && <span className="flex items-center gap-1 px-3 py-1 bg-brand-navy/10 text-brand-navy rounded-full text-xs font-medium">From {priceMin} EGP <button onClick={() => setPriceMin('')}><X size={11} /></button></span>}
                {priceMax && <span className="flex items-center gap-1 px-3 py-1 bg-brand-navy/10 text-brand-navy rounded-full text-xs font-medium">Up to {priceMax} EGP <button onClick={() => setPriceMax('')}><X size={11} /></button></span>}
                {selectedGovs.map(g => <span key={g} className="flex items-center gap-1 px-3 py-1 bg-brand-navy/10 text-brand-navy rounded-full text-xs font-medium">{g} <button onClick={() => toggleGov(g)}><X size={11} /></button></span>)}
                {minRating > 0 && <span className="flex items-center gap-1 px-3 py-1 bg-brand-navy/10 text-brand-navy rounded-full text-xs font-medium">{minRating}★ & up <button onClick={() => setMinRating(0)}><X size={11} /></button></span>}
                <button onClick={clearAll} className="text-xs text-red-500 hover:underline ml-1">Clear all</button>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearAll} className="btn-primary">Clear All Filters</button>
              </div>
            ) : (
              <div className={gridClass}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} size={view === 'list' ? 'md' : 'md'} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="relative ml-auto w-80 max-w-full h-full bg-white p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-gray-900">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <SidebarContent />
            <button onClick={() => setShowMobileFilters(false)} className="w-full btn-primary mt-6">
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
