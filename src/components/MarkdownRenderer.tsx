import React from 'react';
import ReactMarkdown from 'react-markdown';
import { bookFontFamily } from '../utils/fontStyles';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  const bookStyle: React.CSSProperties = {
    fontFamily: bookFontFamily,
    fontSize: '18px',
    lineHeight: '1.8',
    textAlign: 'justify' as const,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 60px',
    textIndent: '2em',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };

  return (
    <div className={className} style={bookStyle}>
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .markdown-book::-webkit-scrollbar {
          display: none;
        }

        .markdown-book h1 {
          font-family: 'Playfair Display', ${bookFontFamily};
          font-size: 2.5em;
          text-align: center;
          margin: 0 0 2em 0;
          font-weight: 300;
          text-indent: 0;
        }
        
        .markdown-book h2 {
          font-family: 'Playfair Display', ${bookFontFamily};
          font-size: 1.8em;
          text-align: center;
          margin: 2em 0 1.5em 0;
          font-weight: 400;
          text-indent: 0;
        }
        
        .markdown-book h3 {
          font-family: 'Playfair Display', ${bookFontFamily};
          font-size: 1.4em;
          text-align: center;
          margin: 1.5em 0 1em 0;
          font-weight: 400;
          text-indent: 0;
        }
        
        .markdown-book p {
          margin-bottom: 1.2em;
          text-align: justify;
          hyphens: auto;
          orphans: 3;
          widows: 3;
        }
        
        .markdown-book p:first-of-type::first-letter {
          font-size: 3em;
          float: left;
          line-height: 0.8;
          margin-right: 0.01em;
          font-weight: 600;
        }
        
        .markdown-book p:first-of-type {
          font-weight: 300;
        }
        
        .markdown-book blockquote {
          margin: 2em 0;
          padding: 1em 2em;
          border-left: 4px solid;
          font-style: italic;
          text-indent: 0;
        }
        
        .markdown-book ul, .markdown-book ol {
          margin: 1.5em 0;
          padding-left: 2em;
          text-indent: 0;
        }
        
        .markdown-book li {
          margin-bottom: 0.8em;
          text-align: left;
        }
        
        .markdown-book code {
          font-family: 'Courier New', monospace;
          background-color: #f0f0f0;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
          text-indent: 0;
        }
        
        .markdown-book pre {
          background-color: #f8f8f8;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.5em 0;
          text-indent: 0;
        }
        
        .markdown-book em, .markdown-book i {
          font-style: italic;
        }
        
        .markdown-book strong, .markdown-book b {
          font-weight: 600;
        }
        
        .markdown-book a {
          text-decoration: underline;
          text-indent: 0;
        }
        
        .markdown-book hr {
          border: none;
          height: 1px;
          background-color: #ccc;
          margin: 3em 0;
          text-indent: 0;
        }
        
        .markdown-book table {
          margin: 2em 0;
          border-collapse: collapse;
          width: 100%;
          text-indent: 0;
        }
        
        .markdown-book th, .markdown-book td {
          padding: 0.8em 1em;
          text-align: left;
          border: 1px solid #ccc;
        }
        
        .markdown-book th {
          font-weight: 600;
        }
      `}</style>
      <div className="markdown-book">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
