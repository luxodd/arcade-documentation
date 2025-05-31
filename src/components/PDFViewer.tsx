import React, { useState } from 'react';
import './PDFViewer.css';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  children: React.ReactNode;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Convert Google Drive view URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  const openPDF = () => {
    setIsOpen(true);
  };

  const closePDF = () => {
    setIsOpen(false);
  };

  return (
    <>
      <span 
        onClick={openPDF}
        className="pdf-link"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openPDF()}
      >
        {children}
      </span>

      {isOpen && (
        <div className="pdf-modal-overlay" onClick={closePDF}>
          <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3 className="pdf-modal-title">{title}</h3>
              <div className="pdf-modal-actions">
                <a 
                  href={pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pdf-open-external"
                >
                  Open in New Tab
                </a>
                <button 
                  onClick={closePDF}
                  className="pdf-close-button"
                  aria-label="Close PDF viewer"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="pdf-content">
              <iframe
                src={getEmbedUrl(pdfUrl)}
                width="100%"
                height="100%"
                frameBorder="0"
                title={title}
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 