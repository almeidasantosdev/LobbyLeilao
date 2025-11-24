import { Heart, MapPin, Tag, Crown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Product } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onToggleFavorite: () => void;
}

export function ProductCard({ product, onClick, onToggleFavorite }: ProductCardProps) {
  const discount = Math.round(((product.suggestedValue - product.minBid) / product.suggestedValue) * 100);

  return (
    <Card className="overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted" onClick={onClick}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/90 hover:bg-background backdrop-blur-sm shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Heart className={`h-5 w-5 ${product.isFavorite ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </Button>
        {product.isPremium && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary hover:bg-primary/90 shadow-md">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-primary text-primary-foreground shadow-lg px-3 py-1 rounded-full text-sm" style={{ fontWeight: 600 }}>
            -{discount}%
          </Badge>
        </div>
      </div>
      <CardContent className="p-5" onClick={onClick}>
        <div className="mb-3">
          <Badge variant="outline" className="mb-3 border-primary/30 text-primary bg-primary/5">
            {product.category}
          </Badge>
          <h3 className="line-clamp-2 leading-snug" style={{ fontWeight: 600 }}>{product.name}</h3>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{product.city}, {product.state}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Tag className="h-3.5 w-3.5" />
          <span>Lote: {product.lot}</span>
        </div>

        <div className="space-y-2 pt-3 border-t">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Lance mínimo</span>
            <span className="text-primary text-xl" style={{ fontWeight: 700 }}>
              R$ {product.minBid.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Valor sugerido</span>
            <span className="text-sm text-muted-foreground/60" style={{ textDecoration: 'line-through', textDecorationThickness: '1px' }}>
              R$ {product.suggestedValue.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
