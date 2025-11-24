import { useState, useEffect } from 'react';

// Declaração de tipos para o PDF.js global
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export function ImportadorDeEditais() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfLibLoaded, setPdfLibLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');

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
        console.log('PDF.js carregado com sucesso!');
      }
    };

    script.onerror = () => {
      setLoadError('Erro ao carregar biblioteca PDF. Tente recarregar a página.');
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const extractPdfText = async (file: File): Promise<string> => {
    try {
      if (!window.pdfjsLib) {
        throw new Error('Biblioteca PDF não está carregada.');
      }

      // Converter arquivo para ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Carregar PDF usando PDF.js global
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = '';

      // Extrair texto de todas as páginas
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n\n--- Página ${i} ---\n${pageText}`;
      }

      return fullText;
    } catch (error) {
      console.error("Erro fatal no PDF:", error);
      throw error;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Por favor, selecione apenas arquivos PDF.');
        return;
      }
      setSelectedFile(file);
      setExtractedText('');
      setLoadError('');
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo PDF primeiro.');
      return;
    }

    if (!pdfLibLoaded) {
      alert('Biblioteca PDF ainda está carregando. Aguarde um momento.');
      return;
    }

    setIsProcessing(true);
    setExtractedText('⏳ Processando PDF...');

    try {
      const text = await extractPdfText(selectedFile);
      
      if (text.trim().length === 0) {
        setExtractedText('⚠️ O PDF não contém texto extraível ou está vazio.');
      } else {
        setExtractedText(text);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setExtractedText(`❌ Erro ao processar PDF: ${errorMessage}\n\nVerifique o console para mais detalhes.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#ff6b35' }}>
          📄 Importador de Editais
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Faça upload de um PDF de edital para extrair automaticamente o texto
        </p>
      </div>

      {/* Status da Biblioteca */}
      {!pdfLibLoaded && !loadError && (
        <div style={{
          padding: '16px',
          backgroundColor: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '20px' }}>⏳</span>
          <span style={{ color: '#1565c0' }}>Carregando biblioteca PDF...</span>
        </div>
      )}

      {loadError && (
        <div style={{
          padding: '16px',
          backgroundColor: '#ffebee',
          border: '1px solid #ef5350',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#c62828'
        }}>
          ⚠️ {loadError}
        </div>
      )}

      {pdfLibLoaded && (
        <div style={{
          padding: '16px',
          backgroundColor: '#e8f5e9',
          border: '1px solid #81c784',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <span style={{ color: '#2e7d32' }}>Biblioteca PDF carregada e pronta!</span>
        </div>
      )}

      {/* Upload Area */}
      <div style={{
        border: '2px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#fafafa'
      }}>
        <label style={{ display: 'block', marginBottom: '12px', fontSize: '16px', fontWeight: '500' }}>
          📂 Selecione um arquivo PDF:
        </label>
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          disabled={!pdfLibLoaded}
          style={{ 
            padding: '12px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            width: '100%',
            fontSize: '14px',
            cursor: pdfLibLoaded ? 'pointer' : 'not-allowed',
            backgroundColor: pdfLibLoaded ? 'white' : '#f5f5f5'
          }}
        />
        
        {selectedFile && (
          <div style={{ 
            marginTop: '12px', 
            padding: '12px',
            backgroundColor: '#fff3e0',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#e65100'
          }}>
            📎 Arquivo selecionado: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(2)} KB)
          </div>
        )}
      </div>

      {/* Botão Processar */}
      <button
        onClick={handleProcess}
        disabled={!selectedFile || isProcessing || !pdfLibLoaded}
        style={{
          padding: '16px 32px',
          backgroundColor: selectedFile && !isProcessing && pdfLibLoaded ? '#ff6b35' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: selectedFile && !isProcessing && pdfLibLoaded ? 'pointer' : 'not-allowed',
          width: '100%',
          marginBottom: '30px',
          transition: 'all 0.3s ease'
        }}
      >
        {isProcessing ? '⏳ Processando...' : '⬇️ Processar PDF e Extrair Texto'}
      </button>

      {/* Área de Texto Extraído */}
      <div>
        <label style={{ 
          display: 'block', 
          marginBottom: '12px', 
          fontSize: '16px',
          fontWeight: '500'
        }}>
          📝 Texto Extraído (Debug):
        </label>
        <textarea
          value={extractedText}
          readOnly
          rows={20}
          placeholder="O texto extraído do PDF aparecerá aqui..."
          style={{
            width: '100%',
            padding: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            backgroundColor: '#f9f9f9',
            resize: 'vertical'
          }}
        />
        
        {extractedText && extractedText.length > 0 && !extractedText.includes('Processando') && (
          <div style={{ 
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#e8f5e9',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#2e7d32'
          }}>
            ✅ Total de caracteres extraídos: <strong>{extractedText.length}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
