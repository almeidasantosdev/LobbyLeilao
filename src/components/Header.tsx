import { Search, Heart, User, Gavel, FileUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onNavigate, currentPage, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Gavel className="h-6 w-6" />
              <span className="text-xl">Lobby Leilão</span>
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('home')}
                className={`transition-colors hover:text-foreground/80 ${
                  currentPage === 'home' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Início
              </button>
              <button 
                onClick={() => onNavigate('catalog')}
                className={`transition-colors hover:text-foreground/80 ${
                  currentPage === 'catalog' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Catálogo
              </button>
              <button 
                onClick={() => onNavigate('importar')}
                className={`transition-colors hover:text-foreground/80 flex items-center gap-1.5 ${
                  currentPage === 'importar' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                <FileUp className="h-4 w-4" />
                Importar Edital
              </button>
              <button 
                onClick={() => onNavigate('pricing')}
                className={`transition-colors hover:text-foreground/80 ${
                  currentPage === 'pricing' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Planos
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`transition-colors hover:text-foreground/80 ${
                  currentPage === 'about' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Sobre Nós
              </button>
            </nav>
          </div>

          {currentPage === 'catalog' && (
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 bg-input-background"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button className="hidden sm:flex shadow-md hover:shadow-lg transition-shadow">
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}