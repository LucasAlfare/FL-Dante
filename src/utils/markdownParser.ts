export type BookType = 'inferno' | 'purgatory' | 'paradise';

export interface ParsedChapter {
  summary: string;
  notes: string;
  content: string;
}

/**
 * Parse markdown content following the structure:
 * 1. TOML header (delimited by +++ )
 * 2. Quick summary (marked with > )
 * 3. Separator (---)
 * 4. Extra notes (multiple > blocks)
 * 5. Main chapter content
 */
export const parseMarkdownContent = (content: string): ParsedChapter => {
  // Remove TOML header
  const headerStart = content.indexOf('+++');
  const headerEnd = content.indexOf('+++', headerStart + 3);
  
  let afterHeader = content;
  if (headerStart !== -1 && headerEnd !== -1) {
    afterHeader = content.slice(headerEnd + 3).trim();
  }
  
  // Find the separator ---
  const separatorIndex = afterHeader.indexOf('\n---\n');
  
  if (separatorIndex === -1) {
    // No separator found, treat everything after header as content
    return {
      summary: '',
      notes: '',
      content: afterHeader
    };
  }
  
  const beforeSeparator = afterHeader.substring(0, separatorIndex);
  const afterSeparator = afterHeader.substring(separatorIndex + 5); // +5 to skip \n---\n
  
  // Extract summary (first > block before separator)
  const summaryMatch = beforeSeparator.match(/^>\s*(.+)$/m);
  const summary = summaryMatch ? summaryMatch[1].trim() : '';
  
  // Split after separator into notes and content
  const linesAfterSeparator = afterSeparator.split('\n');
  let notesLines: string[] = [];
  let contentLines: string[] = [];
  let inNotesSection = true;
  
  for (const line of linesAfterSeparator) {
    const trimmedLine = line.trim();
    
    if (inNotesSection) {
      if (trimmedLine.startsWith('>')) {
        // Still in notes section
        notesLines.push(trimmedLine.substring(1).trim());
      } else if (trimmedLine === '') {
        // Empty line, could be transition between notes and content
        continue;
      } else {
        // First non-quote line, start of content
        inNotesSection = false;
        contentLines.push(line);
      }
    } else {
      // In content section
      contentLines.push(line);
    }
  }
  
  const notes = notesLines.join('\n');
  const mainContent = contentLines.join('\n').trim();
  
  return {
    summary,
    notes,
    content: mainContent
  };
};

/**
 * Load chapter content from file and parse it
 */
export const loadChapterContent = async (book: BookType, chapter: number): Promise<ParsedChapter> => {
  const filePath = `/src/books/${book}/canto${chapter}.md`;
  const response = await fetch(filePath);
  
  if (!response.ok) {
    throw new Error(`Failed to load chapter: ${book} canto ${chapter}`);
  }

  const rawContent = await response.text();
  return parseMarkdownContent(rawContent);
};

/**
 * Convert global chapter number to book and chapter
 */
export const globalToBookChapter = (globalChapter: number): { book: BookType; chapter: number } => {
  if (globalChapter <= 34) return { book: 'inferno', chapter: globalChapter };
  if (globalChapter <= 67) return { book: 'purgatory', chapter: globalChapter - 34 };
  return { book: 'paradise', chapter: globalChapter - 67 };
};

/**
 * Convert book and chapter to global chapter number
 */
export const bookChapterToGlobal = (book: BookType, chapter: number): number => {
  if (book === 'inferno') return chapter;
  if (book === 'purgatory') return 34 + chapter; // Inferno has 34 chapters
  if (book === 'paradise') return 67 + chapter; // Inferno (34) + Purgatory (33) = 67
  return 1;
};
