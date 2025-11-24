import { Search, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeroProps {
  onNavigate: (page: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export function Hero({ onNavigate, searchQuery, onSearchChange, onSearch }: HeroProps) {
  return (
    <div className="relative bg-hero-bg">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground mb-8 shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Mais de 1.000 produtos disponíveis</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] relative inline-block" style={{ fontWeight: 800 }}>
            Encontre os{' '}
            <span className="text-primary">Melhores Leilões</span>
            {' '}em Um Só Lugar
            <div className="absolute -bottom-3 left-0 w-32 h-1.5 bg-primary rounded-full p-[0px] m-[0px]"></div>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Organize e visualize todos os produtos de leilões com categorização inteligente, 
            filtros avançados e uma interface simplificada. Sem burocracia, sem PDFs complexos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto, categoria ou cidade..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                className="pl-12 h-14 bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors text-base shadow-sm"
              />
            </div>
            <Button onClick={onSearch} className="h-14 px-10 text-base shadow-lg hover:shadow-xl transition-shadow">
              Buscar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-8 rounded-xl bg-card shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-5 shadow-md">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-3 text-lg">Preços Competitivos</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Produtos até 50% abaixo do valor de mercado
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-xl bg-card shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-5 shadow-md">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-3 text-lg">Seguro e Confiável</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Leilões oficiais de instituições certificadas
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-xl bg-card shadow-lg hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-5 shadow-md">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-3 text-lg">Interface Intuitiva</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Navegue facilmente sem planilhas ou PDFs complexos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
