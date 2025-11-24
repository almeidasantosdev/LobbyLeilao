export interface Product {
  id: string;
  name: string;
  category: string;
  minBid: number;
  suggestedValue: number;
  lot: string;
  city: string;
  state: string;
  image: string;
  description: string;
  isFavorite?: boolean;
  isPremium?: boolean;
}

export interface FilterState {
  search: string;
  category: string;
  city: string;
  priceRange: string;
}

export interface ExtractedData {
  valor_avaliacao: string;
  data_leilao: string;
  descricao: string;
  lote: string;
  raw_text?: string;
}