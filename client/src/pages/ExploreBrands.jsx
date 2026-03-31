import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, ChevronDown, Star, MapPin, X } from 'lucide-react';
import BrandCard from '../components/BrandCard';
import { brands, governorates, categories } from '../data/mockData';

const sortOptions = ['Top Rated', 'Most Sales', 'Most Products', 'Newest', 'Alphabetical'];
const filterTabs = ['All', '✓ Verified Only', '🌟 Featured', '🆕 New Sellers', '🏆 Top Rated'];

export default function ExploreBrands() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('Top Rated');
  const [selectedGov, setSelectedGov] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...brands];

    if (search) {
      result = result.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase()) ||
        b.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedGov) result = result.filter(b => b.governorate === selectedGov);
    if (selectedCat) result = result.filter(b => b.category === selectedCat);
    if (activeFilter === '✓ Verified Only') result = result.filter(b => b.verified);
    if (activeFilter === '🌟 Featured') result = result.filter(b => b.featured);
    if (activeFilter === '🆕 New Sellers') result = result.filter(b => parseInt(b.memberSince) >= 2023);
    if (activeFilter === '🏆 Top Rated') result = result.filter(b => b.rating >= 4.8);

    switch (sort) {
      case 'Top Rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'Most Sales': result.sort((a, b) => b.sales - a.sales); break;
      case 'Most Products': result.sort((a, b) => b.products - a.products); break;
      case 'Alphabetical': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return result;
  }, [search, selectedGov, selectedCat, activeFilter, sort]);

  const clearFilters = () => {
    setSearch('');
    setSelectedGov('');
    setSelectedCat('');
    setActiveFilter('All');
    setSort('Top Rated');
  };

  const hasFilters = search || selectedGov || selectedCat || activeFilter !== 'All';

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-navy text-white py-12">
        <div className="page-container">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Explore Egyptian Brands</h1>
          <p className="text-gray-300 text-lg">Discover 12,000+ verified local sellers from across Egypt</p>
        </div>
      </div>

      <div className="page-container py-8">
        {/* Search + Controls */}
        <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brands by name, category, location..."
                className="input-field pl-9"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Governorate */}
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="input-field sm:w-48"
            >
              <option value="">All Governorates</option>
              {governorates.slice(0, 15).map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {/* Category */}
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="input-field sm:w-44"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field sm:w-40"
            >
              {sortOptions.map(s => <option key={s}>{s}</option>)}
            </select>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-brand-navy' : 'text-gray-400'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-brand-navy' : 'text-gray-400'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === tab
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors whitespace-nowrap ml-auto flex-shrink-0">
              <X size={13} /> Clear Filters
            </button>
          )}
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-semibold text-brand-navy">{filtered.length}</span> brands
          </p>
        </div>

        {/* Brand Grid / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((brand) => (
              <BrandCard key={brand.id} brand={brand} view="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((brand) => (
              <BrandCard key={brand.id} brand={brand} view="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
