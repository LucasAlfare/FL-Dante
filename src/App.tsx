import { useState, useEffect } from 'react';
import MarkdownRenderer from './components/MarkdownRenderer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SupportPanel from './components/SupportPanel';
import ChapterProvider from './services/ChapterProvider';
import type { BookType } from './services/ChapterProvider';

function App() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [globalChapter, setGlobalChapter] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSupportPanelOpen, setIsSupportPanelOpen] = useState<boolean>(true);

  const getBookAndChapterFromGlobal = (globalChapter: number): { book: string, chapter: number } => {
    if (globalChapter <= 34) {
      return { book: 'inferno', chapter: globalChapter };
    } else if (globalChapter <= 67) {
      return { book: 'purgatory', chapter: globalChapter - 34 };
    } else {
      return { book: 'paradise', chapter: globalChapter - 67 };
    }
  };

  const handleNavigate = (book: string, chapter: number) => {
    const bookOffsets: { [key: string]: number } = {
      'inferno': 0,
      'purgatory': 34,
      'paradise': 67
    };
    const newGlobalChapter = bookOffsets[book] + chapter;
    setGlobalChapter(newGlobalChapter);
  };

  const handlePrevious = () => {
    if (globalChapter > 1) {
      setGlobalChapter(globalChapter - 1);
    }
  };

  const handleNext = () => {
    if (globalChapter < 100) {
      setGlobalChapter(globalChapter + 1);
    }
  };

  const mapBookToType = (book: string): BookType => {
    return book as BookType;
  };

  useEffect(() => {
    const loadChapter = async () => {
      try {
        setLoading(true);
        const { book, chapter } = getBookAndChapterFromGlobal(globalChapter);
        const chapterProvider = new ChapterProvider();
        const chapterContent = await chapterProvider.getChapter(mapBookToType(book), chapter);
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
  }, [globalChapter]);

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
      <Header 
        currentBook={getBookAndChapterFromGlobal(globalChapter).book} 
        currentChapter={getBookAndChapterFromGlobal(globalChapter).chapter} 
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentBook={getBookAndChapterFromGlobal(globalChapter).book}
          currentChapter={getBookAndChapterFromGlobal(globalChapter).chapter}
          onNavigate={handleNavigate}
        />
        <main className={`flex-1 overflow-hidden transition-all duration-300 ${
          isSupportPanelOpen ? 'mr-80' : 'mr-0'
        }`}>
          <MarkdownRenderer 
            content={content} 
            className="prose prose-lg max-w-none h-full overflow-y-auto p-8" 
          />
        </main>
      </div>
      <Footer 
        currentBook={getBookAndChapterFromGlobal(globalChapter).book}
        currentChapter={getBookAndChapterFromGlobal(globalChapter).chapter}
        totalChapters={globalChapter}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      <SupportPanel 
        isOpen={isSupportPanelOpen}
        onToggle={() => setIsSupportPanelOpen(!isSupportPanelOpen)}
      />
    </div>
  )
}

export default App
