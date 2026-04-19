import { useState, useEffect } from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChapterProvider from './services/ChapterProvider';
import type { BookType } from './services/ChapterProvider';

function App() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBook, setCurrentBook] = useState<string>('inferno');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleNavigate = (book: string, chapter: number) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
  };

  const mapBookToType = (book: string): BookType => {
    return book as BookType;
  };

  useEffect(() => {
    const loadChapter = async () => {
      try {
        setLoading(true);
        const chapterProvider = new ChapterProvider();
        const chapterContent = await chapterProvider.getChapter(mapBookToType(currentBook), currentChapter);
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
  }, [currentBook, currentChapter]);

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
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentBook={currentBook}
          currentChapter={currentChapter}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 overflow-hidden">
          <MarkdownRenderer 
            content={content} 
            className="prose prose-lg max-w-none h-full overflow-y-auto p-8" 
          />
        </main>
      </div>
      <footer>
        <p>Divina Comédia - Dante Alighieri</p>
      </footer>
    </div>
  )
}

export default App
