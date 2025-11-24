import { X, MapPin, Tag, Heart, ExternalLink, Calendar, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
}

export function ProductDetail({ product, isOpen, onClose, onToggleFavorite }: ProductDetailProps) {
  if (!product) return null;

  const discount = Math.round(((product.suggestedValue - product.minBid) / product.suggestedValue) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.isPremium && (
                  <Badge className="bg-primary hover:bg-primary/90">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <h2 className="mb-2">{product.name}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{product.city}, {product.state}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>Lote: {product.lot}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-primary text-primary-foreground shadow-md">
                  -{discount}%
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h3>Descrição</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg border bg-card space-y-4">
              <h3>Informações do Leilão</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded bg-muted">
                  <span className="text-sm text-muted-foreground">Lance mínimo</span>
                  <span className="text-xl text-primary">
                    R$ {product.minBid.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded bg-muted">
                  <span className="text-sm text-muted-foreground">Valor sugerido</span>
                  <span className="line-through text-muted-foreground">
                    R$ {product.suggestedValue.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded bg-accent border border-primary/20">
                  <span className="text-sm">Economia estimada</span>
                  <span className="text-primary">
                    R$ {(product.suggestedValue - product.minBid).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <Button className="w-full" size="lg">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Acessar Leilão Oficial
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={onToggleFavorite}
                >
                  <Heart className={`mr-2 h-4 w-4 ${product.isFavorite ? 'fill-primary text-primary' : ''}`} />
                  {product.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent border border-primary/30">
              <div className="flex gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm mb-1">
                    Data do Leilão
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Consulte o site oficial para datas e horários específicos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
