import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { PricingPlans } from './components/PricingPlans';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ImportadorDeEditais } from './components/ImportadorDeEditais';
import { Toaster } from './components/ui/sonner';
import { mockProducts } from './data/mockProducts';
import { Product } from './types';

type Page = 'home' | 'catalog' | 'pricing' | 'about' | 'importar';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentPage('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleToggleFavorite = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    if (selectedProduct?.id === productId) {
      setSelectedProduct(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              onNavigate={handleNavigate}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={handleSearch}
            />
            
            {/* Featured Products Section */}
            <div className="container mx-auto px-4 py-20">
              <div className="text-center mb-16">
                <div className="inline-block mb-4">
                  <h2 className="text-4xl md:text-5xl relative inline-block" style={{ fontWeight: 700 }}>
                    Produtos em Destaque
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"></div>
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
                  Confira alguns dos produtos disponíveis em nossos leilões
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, 8).map(product => (
                  <div key={product.id}>
                    <div
                      onClick={() => handleProductClick(product)}
                      className="cursor-pointer group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="mb-1 line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <p className="text-primary text-lg" style={{ fontWeight: 600 }}>
                        R$ {product.minBid.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => handleNavigate('catalog')}
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                  style={{ fontWeight: 600 }}
                >
                  Ver Todos os Produtos
                </button>
              </div>
            </div>
          </>
        )}

        {currentPage === 'catalog' && (
          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentPage === 'pricing' && <PricingPlans />}

        {currentPage === 'about' && <About />}
        
        {currentPage === 'importar' && <ImportadorDeEditais />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleFavorite={() => {
          if (selectedProduct) {
            handleToggleFavorite(selectedProduct.id);
          }
        }}
      />

      <Toaster position="top-right" />
    </div>
  );
}
