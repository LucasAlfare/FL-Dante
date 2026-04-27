import fs from 'fs';
import path from 'path';

// Função para ler arquivo markdown
function readMarkdownFile(filePath) {
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf8');
}

// Função para normalizar nome do livro (reverso)
function normalizeBookName(folderName) {
    const nameMap = {
        'inferno': 'Inferno',
        'purgatory': 'Purgatório',
        'paradise': 'Paraíso'
    };
    return nameMap[folderName] || folderName;
}

// Função para extrair número do capítulo
function getChapterNumber(folderName) {
    const match = folderName.match(/canto-(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Ler estrutura de conteúdo
const contentDir = './content';
const books = [];

// Verificar se o diretório content existe
if (!fs.existsSync(contentDir)) {
    console.error('❌ Diretório ./content não encontrado!');
    process.exit(1);
}

// Processar cada livro
const bookFolders = fs.readdirSync(contentDir)
    .filter(item => fs.statSync(path.join(contentDir, item)).isDirectory())
    .sort();

bookFolders.forEach(bookFolder => {
    const bookPath = path.join(contentDir, bookFolder);
    const bookName = normalizeBookName(bookFolder);
    
    console.log(`📚 Processando livro: ${bookName}`);
    
    const chapters = [];
    
    // Processar cada capítulo
    const chapterFolders = fs.readdirSync(bookPath)
        .filter(item => fs.statSync(path.join(bookPath, item)).isDirectory())
        .filter(item => item.startsWith('canto-'))
        .sort((a, b) => getChapterNumber(a) - getChapterNumber(b));
    
    chapterFolders.forEach(chapterFolder => {
        const chapterPath = path.join(bookPath, chapterFolder);
        const chapterNumber = getChapterNumber(chapterFolder);
        
        console.log(`  📖 Canto ${chapterNumber}`);
        
        // Ler os três arquivos markdown
        const summary = readMarkdownFile(path.join(chapterPath, 'resumo.md'));
        const notes = readMarkdownFile(path.join(chapterPath, 'notas.md'));
        const body = readMarkdownFile(path.join(chapterPath, 'texto.md'));
        
        // Processar notas: converter em array
        let notesArray = [];
        if (notes) {
            // Separar por linhas duplas (parágrafos vazios)
            const separateNotes = notes
                .split('\n\n')
                .map(note => note.trim())
                .filter(note => note && !note.startsWith('#'));
            notesArray = separateNotes;
        }
        
        chapters.push({
            summary: summary.trim(),
            notes: notesArray,
            body: body.trim()
        });
    });
    
    books.push({
        name: bookName,
        chapters: chapters
    });
    
    console.log(`✅ ${chapters.length} capítulos processados\n`);
});

// Gerar o JSON final no formato esperado
const finalJson = books;

// Escrever no arquivo de destino
const outputPath = './src/data/books.json';
fs.writeFileSync(outputPath, JSON.stringify(finalJson, null, 2), 'utf8');

console.log('🎉 Compilação concluída com sucesso!');
console.log(`📄 JSON gerado em: ${outputPath}`);
console.log(`📊 Estatísticas:`);
console.log(`   - ${books.length} livros`);
console.log(`   - ${books.reduce((total, book) => total + book.chapters.length, 0)} capítulos totais`);
