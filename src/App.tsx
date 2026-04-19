import { useState, useEffect } from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';
import Header from './components/Header';
import ChapterProvider from './services/ChapterProvider';

function App() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBook, setCurrentBook] = useState<string>('Inferno');
  const [currentChapter, setCurrentChapter] = useState<number>(1);

  useEffect(() => {
    const loadChapter = async () => {
      try {
        setLoading(true);
        const chapterProvider = new ChapterProvider();
        const chapterContent = await chapterProvider.getChapter('inferno', 1);
        setContent(chapterContent);
        setError(null);
      } catch (err) {
        setError('Failed to load chapter content');
        console.error('Error loading chapter:', err);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-lg">Loading Divine Comedy...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header currentBook={currentBook} currentChapter={currentChapter} />
      <main className="flex-1 overflow-hidden">
        <MarkdownRenderer 
          content={content} 
          className="prose prose-lg max-w-none h-full overflow-y-auto p-8" 
        />
      </main>
      <footer>
        <p>Divina Comédia - Dante Alighieri</p>
      </footer>
    </div>
  )
}

export default App
