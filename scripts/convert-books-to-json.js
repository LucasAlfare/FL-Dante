import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para parse do frontmatter TOML
function parseTomlFrontmatter(content) {
  const frontmatterRegex = /^\+\+\+\n([\s\S]*?)\n\+\+\+/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content: content };
  }
  
  const frontmatterText = match[1];
  const remainingContent = content.slice(match[0].length).trim();
  
  // Parse simples do TOML (só para o que precisamos)
  const metadata = {};
  const lines = frontmatterText.split('\n');
  
  lines.forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        let value = valueParts.join('=').trim();
        // Remove aspas se existirem
        if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        metadata[key.trim()] = value;
      }
    }
  });
  
  return { metadata, content: remainingContent };
}

// Função para extrair resumo, notas e corpo do texto
function parseChapterContent(content) {
  const lines = content.split('\n');
  let summary = '';
  let notes = [];
  let body = [];
  let currentNote = '';
  let inNote = false;
  let foundFirstNote = false;
  let bodyStarted = false;
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    // Verifica se é uma linha de nota (começa com >)
    if (trimmedLine.startsWith('>')) {
      inNote = true;
      bodyStarted = false;
      // Remove o > e espaços
      const noteContent = trimmedLine.substring(1).trim();
      if (noteContent) {
        // Se é a primeira nota, vai para o summary
        if (!foundFirstNote && !summary) {
          summary = noteContent;
          foundFirstNote = true;
        } else {
          // Senão, adiciona às notas
          currentNote += (currentNote ? ' ' : '') + noteContent;
        }
      }
    }
    // Verifica se é o separador ---
    else if (trimmedLine === '---') {
      // Finaliza a nota atual se existir
      if (currentNote) {
        notes.push(currentNote);
        currentNote = '';
        inNote = false;
      }
    }
    // Se estávamos em uma nota e a linha não começa com >, finaliza a nota
    else if (inNote && currentNote) {
      notes.push(currentNote);
      currentNote = '';
      inNote = false;
      // Se a linha não está vazia, começa o corpo
      if (trimmedLine) {
        bodyStarted = true;
        body.push(line);
      }
    }
    // Se o corpo já começou ou se não é uma linha vazia após as notas
    else if (bodyStarted || (trimmedLine && !inNote && foundFirstNote)) {
      bodyStarted = true;
      body.push(line);
    }
  });
  
  // Adiciona a última nota se existir
  if (currentNote) {
    notes.push(currentNote);
  }
  
  return {
    summary: summary,
    notes: notes,
    body: body.join('\n').trim()
  };
}

// Função principal para processar todos os livros
function processAllBooks() {
  const booksDir = path.join(__dirname, '..', 'public', 'books');
  const books = [];
  
  // Obtém todos os diretórios de livros
  const bookDirs = fs.readdirSync(booksDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  bookDirs.forEach(bookDir => {
    const bookPath = path.join(booksDir, bookDir);
    const chapters = [];
    
    // Obtém todos os arquivos .md do livro
    const chapterFiles = fs.readdirSync(bookPath)
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        // Ordena numericamente pelo número do canto
        const aNum = parseInt(a.match(/canto(\d+)/)[1]);
        const bNum = parseInt(b.match(/canto(\d+)/)[1]);
        return aNum - bNum;
      });
    
    chapterFiles.forEach(file => {
      const filePath = path.join(bookPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Parse do frontmatter
      const { metadata, content: markdownContent } = parseTomlFrontmatter(content);
      
      // Parse do conteúdo
      const { summary, notes, body } = parseChapterContent(markdownContent);
      
      // Extrai número do canto do nome do arquivo
      const cantoMatch = file.match(/canto(\d+)/);
      const cantoNumber = cantoMatch ? parseInt(cantoMatch[1]) : 0;
      
      chapters.push({
        summary: summary,
        notes: notes,
        body: body
      });
    });
    
    // Determina o nome do livro baseado no diretório
    let bookName = bookDir.charAt(0).toUpperCase() + bookDir.slice(1);
    if (bookDir === 'inferno') bookName = 'Inferno';
    if (bookDir === 'paradise') bookName = 'Paraíso';
    if (bookDir === 'purgatory') bookName = 'Purgatório';
    
    books.push({
      name: bookName,
      slug: bookDir,
      chapters: chapters
    });
  });
  
  return books;
}

// Executa a conversão
try {
  const books = processAllBooks();
  
  // Cria o diretório data se não existir
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Salva o JSON
  const outputPath = path.join(dataDir, 'books.json');
  fs.writeFileSync(outputPath, JSON.stringify(books, null, 2), 'utf-8');
  
  console.log(`✅ JSON gerado com sucesso em: ${outputPath}`);
  console.log(`📚 Total de livros processados: ${books.length}`);
  
  books.forEach(book => {
    console.log(`  - ${book.name}: ${book.chapters.length} capítulos`);
  });
  
} catch (error) {
  console.error('❌ Erro durante a conversão:', error);
  process.exit(1);
}
