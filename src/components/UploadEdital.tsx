import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { parseEditalData, ExtractedData } from '../utils/pdfParser';

interface UploadEditalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExtractedData) => void;
}

// Declaração de tipos para o PDF.js global
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export function UploadEdital({ isOpen, onClose, onSave }: UploadEditalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false);

  // Carregar PDF.js quando o componente montar
  useEffect(() => {
    // Verificar se já está carregado
    if (window.pdfjsLib) {
      setPdfLibLoaded(true);
      return;
    }

    // Criar script tag para carregar PDF.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    
    script.onload = () => {
      // Configurar o Worker
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        setPdfLibLoaded(true);
      }
    };

    script.onerror = () => {
      setError('Erro ao carregar biblioteca PDF. Por favor, recarregue a página.');
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setSuccess(false);
      setExtractedData(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.includes('pdf')) {
      setFile(droppedFile);
      setError('');
      setSuccess(false);
      setExtractedData(null);
    } else {
      setError('Por favor, envie apenas arquivos PDF.');
    }
  };

  const handleProcessFile = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo PDF.');
      return;
    }

    if (!pdfLibLoaded || !window.pdfjsLib) {
      setError('Biblioteca PDF ainda não foi carregada. Aguarde um momento.');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess(false);

    try {
      // Validação do arquivo
      if (!file.type.includes('pdf')) {
        throw new Error('Por favor, envie um arquivo PDF válido.');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('O arquivo é muito grande. O tamanho máximo é 10MB.');
      }

      // Converter arquivo para ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Carregar PDF usando PDF.js global
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = '';

      // Extrair texto de todas as páginas
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      if (!fullText || fullText.trim().length === 0) {
        throw new Error('O PDF está vazio ou não contém texto extraível.');
      }

      // Fazer parsing dos dados
      const data = parseEditalData(fullText);
      setExtractedData(data);
      setSuccess(true);

    } catch (err) {
      console.error('Erro ao processar PDF:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar o arquivo.');
      setExtractedData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof ExtractedData, value: string) => {
    if (extractedData) {
      setExtractedData({
        ...extractedData,
        [field]: value
      });
    }
  };

  const handleSaveData = () => {
    if (extractedData) {
      onSave(extractedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFile(null);
    setExtractedData(null);
    setError('');
    setSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            📄 Importar Edital de Leilão
          </DialogTitle>
          <DialogDescription>
            Faça upload de um PDF de edital para extrair automaticamente as informações do leilão.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Upload Area */}
          {!extractedData && (
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="pdf-upload"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="text-5xl mb-4">📤</div>
                  <p className="mb-2">
                    {file ? (
                      <span className="text-primary">{file.name}</span>
                    ) : (
                      <>
                        <span className="text-primary hover:underline">Clique para selecionar</span>
                        {' ou arraste um arquivo PDF aqui'}
                      </>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tamanho máximo: 10MB
                  </p>
                </label>
              </div>

              {!pdfLibLoaded && (
                <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="animate-spin text-2xl">⏳</div>
                  <span>Carregando biblioteca PDF...</span>
                </div>
              )}

              {file && !isProcessing && pdfLibLoaded && (
                <Button
                  onClick={handleProcessFile}
                  className="w-full"
                  size="lg"
                >
                  📄 Processar Edital
                </Button>
              )}

              {isProcessing && (
                <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="animate-spin text-2xl">⏳</div>
                  <span>Processando PDF e extraindo dados...</span>
                </div>
              )}
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                ⚠️ {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && extractedData && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                ✅ Dados extraídos com sucesso! Revise e edite as informações abaixo se necessário.
              </AlertDescription>
            </Alert>
          )}

          {/* Extracted Data Form */}
          {extractedData && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">Dados Extraídos</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setExtractedData(null);
                    setSuccess(false);
                  }}
                >
                  ❌ Processar Outro
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lote">Número do Lote</Label>
                  <Input
                    id="lote"
                    value={extractedData.lote}
                    onChange={(e) => handleInputChange('lote', e.target.value)}
                    placeholder="Ex: 001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor de Avaliação</Label>
                  <Input
                    id="valor"
                    value={extractedData.valor_avaliacao}
                    onChange={(e) => handleInputChange('valor_avaliacao', e.target.value)}
                    placeholder="Ex: R$ 150.000,00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data">Data do Leilão</Label>
                  <Input
                    id="data"
                    value={extractedData.data_leilao}
                    onChange={(e) => handleInputChange('data_leilao', e.target.value)}
                    placeholder="Ex: 25/12/2025"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={extractedData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  placeholder="Descrição do item do leilão"
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Raw Text Preview */}
              {extractedData.raw_text && (
                <details className="border rounded-lg p-4">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    👁️ Ver texto completo extraído do PDF
                  </summary>
                  <div className="mt-4 p-4 bg-gray-50 rounded text-xs max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-mono">
                      {extractedData.raw_text.substring(0, 2000)}
                      {extractedData.raw_text.length > 2000 && '...'}
                    </pre>
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveData}
                  className="flex-1"
                  size="lg"
                >
                  ✅ Salvar Dados
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
