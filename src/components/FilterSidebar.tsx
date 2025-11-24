import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories, cities, priceRanges } from '../data/mockProducts';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onClose 
}: FilterSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-16 lg:top-20 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]
        w-80 bg-background border-r z-40 transition-transform duration-300 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary" />
              <h3 style={{ fontWeight: 700 }}>Filtros</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters}
                className="text-sm text-primary hover:text-primary hover:bg-primary/10"
              >
                Limpar
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label style={{ fontWeight: 600 }}>Categoria</Label>
              <Select 
                value={filters.category} 
                onValueChange={(value) => onFilterChange('category', value)}
              >
                <SelectTrigger className="border-border focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label style={{ fontWeight: 600 }}>Cidade</Label>
              <Select 
                value={filters.city} 
                onValueChange={(value) => onFilterChange('city', value)}
              >
                <SelectTrigger className="border-border focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label style={{ fontWeight: 600 }}>Faixa de Preço</Label>
              <Select 
                value={filters.priceRange} 
                onValueChange={(value) => onFilterChange('priceRange', value)}
              >
                <SelectTrigger className="border-border focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Selecione uma faixa" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
              <span className="text-sm" style={{ fontWeight: 600 }}>Filtros ativos</span>
              <span className="text-primary text-lg" style={{ fontWeight: 700 }}>
                {Object.values(filters).filter(v => v && v !== 'Todos' && v !== 'Todas' && v !== 'all' && v !== '').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
