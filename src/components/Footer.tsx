import { Gavel, Mail, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gavel className="h-6 w-6" />
              <span className="text-xl">Lobby Leilão</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Organize e visualize os melhores leilões do Brasil em um só lugar.
            </p>
            <div className="flex gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Catálogo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Planos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre Nós
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Categorias</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Veículos</li>
              <li>Eletrônicos</li>
              <li>Celulares</li>
              <li>Tablets</li>
              <li>Móveis</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contato@lobbyleilao.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Lobby Leilão. Todos os direitos reservados.</p>
          <p className="mt-2">
            Esta plataforma não realiza leilões. Somos apenas um agregador de informações de leilões oficiais.
          </p>
        </div>
      </div>
    </footer>
  );
}
