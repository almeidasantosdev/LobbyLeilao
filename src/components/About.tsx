import { Target, Users, Zap, Shield, TrendingUp, Smartphone } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-4">Sobre o Lobby Leilão</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Revolucionando a forma como você acessa e participa de leilões no Brasil
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2>Nossa Missão</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Simplificar o acesso aos leilões brasileiros, eliminando a burocracia de PDFs complexos 
              e planilhas confusas. Nossa plataforma centraliza todos os produtos em um único lugar, 
              com categorização inteligente e uma interface moderna que torna a experiência de busca 
              intuitiva e eficiente.
            </p>
          </div>

          {/* Target Audience */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2>Para Quem Criamos</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O Lobby Leilão foi desenvolvido pensando em diversos perfis de usuários:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="mb-2">Investidores e Revendedores</h4>
                  <p className="text-sm text-muted-foreground">
                    Encontre oportunidades lucrativas de produtos abaixo do mercado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="mb-2">Empreendedores</h4>
                  <p className="text-sm text-muted-foreground">
                    Adquira equipamentos e veículos para seu negócio com economia
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="mb-2">Pequenos Lojistas</h4>
                  <p className="text-sm text-muted-foreground">
                    Compre eletrônicos e produtos para revenda
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="mb-2">Compradores Finais</h4>
                  <p className="text-sm text-muted-foreground">
                    Encontre veículos, eletrônicos e móveis com ótimos preços
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Differentials */}
          <div className="space-y-6">
            <h2 className="text-center">Nossos Diferenciais</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Centralização</h3>
                <p className="text-sm text-muted-foreground">
                  Todos os leilões em um só lugar, sem precisar visitar múltiplos sites
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Experiência Otimizada</h3>
                <p className="text-sm text-muted-foreground">
                  Interface moderna e intuitiva, sem complexidade de PDFs e planilhas
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2">Filtros Inteligentes</h3>
                <p className="text-sm text-muted-foreground">
                  Encontre exatamente o que procura com filtros avançados e precisos
                </p>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="space-y-4 p-8 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <h2>Visão de Futuro</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Estamos constantemente evoluindo nossa plataforma. Em breve, você poderá contar com:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Integração direta com APIs de leiloeiros oficiais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Aplicativo mobile para iOS e Android</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Sistema de alertas automáticos para produtos de seu interesse</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Dashboard com estatísticas e análises em tempo real</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
