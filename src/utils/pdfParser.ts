export interface ExtractedData {
  valor_avaliacao: string;
  data_leilao: string;
  descricao: string;
  lote: string;
  raw_text?: string;
}

/**
 * Extrai valor monetário do texto (formato R$ X.XXX,XX ou R$ X,XX)
 */
function extractValorAvaliacao(text: string): string {
  // Padrões de valor monetário brasileiro
  const patterns = [
    /R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/g,
    /(?:valor|avaliação|lance\s+mínimo|preço)[\s:]*R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/gi,
    /(\d{1,3}(?:\.\d{3})*,\d{2})\s*(?:reais)/gi
  ];

  let valores: string[] = [];
  
  for (const pattern of patterns) {
    const matches = [...text.matchAll(pattern)];
    valores.push(...matches.map(m => m[1] || m[0]));
  }

  valores = [...new Set(valores)];
  
  if (valores.length > 0) {
    let valor = valores[0].replace(/R\$/g, '').trim();
    if (!valor.includes('R$')) {
      valor = `R$ ${valor}`;
    }
    return valor;
  }

  return '';
}

/**
 * Extrai data do texto (formato dd/mm/aaaa ou dd-mm-aaaa)
 */
function extractDataLeilao(text: string): string {
  const patterns = [
    /(?:data|realização|leilão|pregão)[\s:]*(\d{2}\/\d{2}\/\d{4})/gi,
    /(?:dia|em)[\s:]*(\d{2}\/\d{2}\/\d{4})/gi,
    /(\d{2}\/\d{2}\/\d{4})/g,
    /(\d{2}-\d{2}-\d{4})/g
  ];

  let datas: string[] = [];
  
  for (const pattern of patterns) {
    const matches = [...text.matchAll(pattern)];
    datas.push(...matches.map(m => m[1] || m[0]));
  }

  datas = [...new Set(datas)];
  
  if (datas.length > 0) {
    return datas[0].replace(/-/g, '/');
  }

  return '';
}

/**
 * Extrai número do lote
 */
function extractLote(text: string): string {
  const patterns = [
    /lote\s*(?:n[°º]?|número)?\s*[:.?\s]*(\d+)/gi,
    /lote\s+(\d+)/gi,
    /lot\s+(\d+)/gi
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  const simpleMatch = text.match(/lote\s*(\d+)/i);
  if (simpleMatch) {
    return simpleMatch[1];
  }

  return '';
}

/**
 * Extrai descrição após palavras-chave
 */
function extractDescricao(text: string): string {
  const patterns = [
    /(?:descrição|bem|objeto|imóvel|veículo)[\s:]+([^\n]{50,300})/gi,
    /lote\s*\d+[\s:-]+([^\n]{50,300})/gi,
    /(?:trata-se de|refere-se a|consiste em)[\s:]+([^\n]{50,300})/gi
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let descricao = match[1].trim();
      descricao = descricao.replace(/^[:\-.,;]+/, '').trim();
      if (descricao.length > 300) {
        descricao = descricao.substring(0, 297) + '...';
      }
      return descricao;
    }
  }

  const cleanText = text.replace(/\s+/g, ' ').trim();
  if (cleanText.length > 200) {
    return cleanText.substring(0, 197) + '...';
  }
  
  return cleanText || 'Descrição não encontrada no documento';
}

/**
 * Função principal que processa o texto extraído
 */
export function parseEditalData(text: string): ExtractedData {
  const normalizedText = text.replace(/\s+/g, ' ').trim();

  return {
    valor_avaliacao: extractValorAvaliacao(normalizedText),
    data_leilao: extractDataLeilao(normalizedText),
    lote: extractLote(normalizedText),
    descricao: extractDescricao(normalizedText),
    raw_text: text
  };
}
