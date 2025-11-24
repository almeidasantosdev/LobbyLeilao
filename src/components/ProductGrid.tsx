import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { Product, FilterState } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

export function ProductGrid({ products, onProductClick, onToggleFavorite }: ProductGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'Todos',
    city: 'Todas',
    priceRange: 'all',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'Todos',
      city: 'Todas',
      priceRange: 'all',
    });
  };

  const filteredProducts = products.filter(product => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!product.name.toLowerCase().includes(searchLower) &&
          !product.category.toLowerCase().includes(searchLower) &&
          !product.city.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Category filter
    if (filters.category !== 'Todos' && product.category !== filters.category) {
      return false;
    }

    // City filter
    if (filters.city !== 'Todas' && product.city !== filters.city) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.minBid < min || product.minBid > max) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Search & Filter */}
      <div className="lg:hidden mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-9 bg-input-background"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-6">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>Produtos Disponíveis</h2>
                <p className="text-base" style={{ color: 'oklch(0.55 0 0)' }}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                  onToggleFavorite={() => onToggleFavorite(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
