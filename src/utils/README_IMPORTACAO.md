# Sistema de Importação de Editais - Lobby Leilão

## Visão Geral

O sistema de importação de editais permite extrair automaticamente informações de arquivos PDF de editais de leilão usando processamento de texto e expressões regulares (Regex).

## Arquivos Criados

### 1. `/utils/pdfParser.ts`
Contém toda a lógica de extração e parsing de dados:

- **extractTextFromPDF()**: Extrai texto do PDF usando a biblioteca `pdfjs-dist` (Mozilla PDF.js)
- **parseEditalData()**: Analisa o texto e extrai dados estruturados
- **processEditalPDF()**: Função principal que combina extração e parsing

### 2. `/components/UploadEdital.tsx`
Componente React com interface completa:

- Modal com drag & drop para upload
- Processamento em tempo real
- Formulário de edição dos dados extraídos
- Validações e tratamento de erros

### 3. Tipos e Integrações
- Tipo `ExtractedData` em `/types/index.ts`
- Integração no Header com botão "Importar Edital"
- Handler no App.tsx para processar dados salvos

## Dados Extraídos

O sistema extrai automaticamente:

### 📊 Valor de Avaliação
```regex
R$ X.XXX,XX ou R$ X,XX
Contexto: "valor", "avaliação", "lance mínimo", "preço"
```

### 📅 Data do Leilão
```regex
dd/mm/aaaa ou dd-mm-aaaa
Contexto: "data", "realização", "leilão", "pregão"
```

### 📦 Número do Lote
```regex
"Lote nº XXX" ou "Lote XXX"
```

### 📝 Descrição
```regex
Texto após: "Descrição", "Bem", "Objeto", "Imóvel", "Veículo"
Limites: 50-300 caracteres
```

## Padrões de Regex Utilizados

### Valor Monetário
```javascript
/R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/g
/(?:valor|avaliação|lance\s+mínimo|preço)[\s:]*R\$\s*(\d{1,3}(?:\.\d{3})*,\d{2})/gi
```

### Data
```javascript
/(?:data|realização|leilão|pregão)[\s:]*(\d{2}\/\d{2}\/\d{4})/gi
/(\d{2}\/\d{2}\/\d{4})/g
```

### Lote
```javascript
/lote\s*(?:n[°º]?|número)?\s*[:.]?\s*(\d+)/gi
```

### Descrição
```javascript
/(?:descrição|bem|objeto|imóvel|veículo)[\s:]+([^\n]{50,300})/gi
```

## Fluxo de Uso

1. **Upload**: Usuário faz upload de arquivo PDF (máx 10MB)
2. **Extração**: Sistema extrai texto usando `pdfjs-dist` (Mozilla PDF.js)
3. **Parsing**: Regex identifica e extrai dados estruturados
4. **Validação**: Dados são exibidos para revisão
5. **Edição**: Usuário pode editar qualquer campo
6. **Salvamento**: Dados são processados pela aplicação

## Tratamento de Erros

O sistema trata:
- Arquivos não-PDF
- PDFs corrompidos
- PDFs sem texto extraível
- Arquivos muito grandes (>10MB)
- Falhas no parsing

## Exemplo de Dados Extraídos

```json
{
  "lote": "142",
  "valor_avaliacao": "R$ 245.000,00",
  "data_leilao": "15/01/2026",
  "descricao": "Imóvel residencial situado na Rua das Flores, 123, composto de 3 quartos, sala, cozinha e garagem para 2 veículos.",
  "raw_text": "..." // texto completo extraído
}
```

## Melhorias Futuras

- Suporte para mais formatos de data
- Extração de endereço completo
- Identificação de tipo de bem (imóvel, veículo, etc)
- OCR para PDFs escaneados
- Múltiplos lotes em um único PDF
- Extração de imagens do PDF

## Bibliotecas Utilizadas

- **pdfjs-dist**: Extração de texto de PDFs (biblioteca Mozilla PDF.js para web)
- **lucide-react**: Ícones da interface
- **shadcn/ui**: Componentes (Dialog, Input, Button, etc)
- **sonner**: Notificações toast

## Observações Importantes

⚠️ **Limitações**:
- Funciona apenas com PDFs com texto selecionável
- PDFs escaneados (imagens) não são suportados sem OCR
- Padrões de texto podem variar entre diferentes fontes de editais

💡 **Dicas**:
- Sempre revise os dados extraídos antes de salvar
- Para PDFs com formatação complexa, ajuste manualmente
- Teste com diferentes formatos de editais para melhorar regex