export type BookType = 'inferno' | 'purgatory' | 'paradise';

interface ChapterInfo {
  book: BookType;
  chapter: number;
}

class ChapterProvider {
  normalizeChapterNumber(globalChapter: number): ChapterInfo {
    if (globalChapter < 1 || globalChapter > 100) {
      throw new Error('Invalid chapter number. Must be between 1 and 100.');
    }
    
    if (globalChapter <= 34) {
      return { book: 'inferno', chapter: globalChapter };
    } else if (globalChapter <= 67) {
      return { book: 'purgatory', chapter: globalChapter - 34 };
    } else {
      return { book: 'paradise', chapter: globalChapter - 67 };
    }
  }

  async getChapterByNumber(globalChapter: number): Promise<string> {
    const { book, chapter } = this.normalizeChapterNumber(globalChapter);
    return this.getChapter(book, chapter);
  }

  async getChapter(book: BookType, chapter: number): Promise<string> {
    try {
      const filePath = `/src/books/${book}/canto${chapter}.md`;
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load chapter: ${book} canto ${chapter}`);
      }

      const content = await response.text();
      return this.removeHeader(content);
    } catch (error) {
      console.error(`Error loading chapter ${book} ${chapter}:`, error);
      throw error;
    }
  }

  private removeHeader(content: string): string {
    const lines = content.split('\n');
    let startIndex = 0;
    let endIndex = lines.length;

    // Find the opening +++
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '+++') {
        startIndex = i + 1;
        break;
      }
    }

    // Find the closing +++
    for (let i = startIndex; i < lines.length; i++) {
      if (lines[i].trim() === '+++') {
        endIndex = i + 1;
        break;
      }
    }

    // Return content after the header
    return lines.slice(endIndex).join('\n').trim();
  }
}

export default ChapterProvider;
