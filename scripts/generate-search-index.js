import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksDir = path.join(__dirname, '../src/books');
const outputFile = path.join(__dirname, '../src/data/search-index.json');

function parseMarkdownFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { meta: {}, content: content.trim() };
  }
  
  const frontMatter = match[1];
  const markdownContent = match[2];
  
  const meta = {};
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/['"]/g, '');
      meta[key.trim()] = value;
    }
  });
  
  return { meta, content: markdownContent.trim() };
}

function extractSummary(content) {
  const summaryRegex = /^> (.+?)(?:\n\n|\n$|$)/m;
  const match = content.match(summaryRegex);
  return match ? match[1].trim() : '';
}

function processBooks() {
  const searchIndex = [];
  const books = ['inferno', 'purgatory', 'paradise'];
  
  books.forEach(book => {
    const bookDir = path.join(booksDir, book);
    const files = fs.readdirSync(bookDir).filter(file => file.endsWith('.md'));
    
    files.forEach(file => {
      const filePath = path.join(bookDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { meta, content: markdownContent } = parseMarkdownFrontMatter(content);
      
      // Extract chapter number from filename (canto1.md -> 1)
      const chapterMatch = file.match(/canto(\d+)\.md/);
      const chapter = chapterMatch ? parseInt(chapterMatch[1]) : 0;
      
      // Extract summary from content
      const summary = extractSummary(markdownContent);
      
      // Clean content for search (remove markdown syntax)
      const cleanContent = markdownContent
        .replace(/^>.*$/gm, '') // Remove blockquotes
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`.*?`/g, '') // Remove inline code
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/^#+\s*/gm, '') // Remove headers
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
      
      searchIndex.push({
        id: `${book}-canto${chapter}`,
        book,
        chapter,
        title: meta.title || `Canto ${chapter}`,
        summary,
        content: cleanContent,
        path: `/${book}/canto${chapter}`
      });
    });
  });
  
  return searchIndex;
}

// Ensure data directory exists
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Generate and save index
const searchIndex = processBooks();
fs.writeFileSync(outputFile, JSON.stringify(searchIndex, null, 2));

console.log(`✅ Generated search index with ${searchIndex.length} entries`);
console.log(`📁 Saved to: ${outputFile}`);
