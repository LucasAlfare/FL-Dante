import fs from 'fs';
import path from 'path';

/**
 * Reads a markdown file and returns its content as a string.
 * Returns empty string if file doesn't exist.
 * @param {string} filePath - Path to the markdown file
 * @returns {string} File content or empty string
 */
function readMarkdownFile(filePath) {
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf8');
}

/**
 * Converts folder name to proper book display name.
 * Maps internal folder names to their Portuguese display names.
 * @param {string} folderName - The folder name (inferno, purgatory, paradise)
 * @returns {string} The proper book name in Portuguese
 */
function normalizeBookName(folderName) {
    const nameMap = {
        'inferno': 'Inferno',
        'purgatory': 'Purgatório',
        'paradise': 'Paraíso'
    };
    return nameMap[folderName] || folderName;
}

/**
 * Extracts chapter number from folder name pattern 'canto-XX'.
 * @param {string} folderName - Folder name in format 'canto-XX'
 * @returns {number} Chapter number or 0 if not found
 */
function getChapterNumber(folderName) {
    const match = folderName.match(/canto-(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Content directory structure and books array
const contentDir = './content';
const books = [];

// Verify content directory exists
if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory ./content not found!');
    process.exit(1);
}

// Process each book folder
const bookFolders = fs.readdirSync(contentDir)
    .filter(item => fs.statSync(path.join(contentDir, item)).isDirectory())
    .sort();

bookFolders.forEach(bookFolder => {
    const bookPath = path.join(contentDir, bookFolder);
    const bookName = normalizeBookName(bookFolder);

    console.log(`📚 Processing book: ${bookName}`);

    const chapters = [];

    // Process each chapter folder
    const chapterFolders = fs.readdirSync(bookPath)
        .filter(item => fs.statSync(path.join(bookPath, item)).isDirectory())
        .filter(item => item.startsWith('canto-'))
        .sort((a, b) => getChapterNumber(a) - getChapterNumber(b));

    chapterFolders.forEach(chapterFolder => {
        const chapterPath = path.join(bookPath, chapterFolder);
        const chapterNumber = getChapterNumber(chapterFolder);

        console.log(`  📖 Canto ${chapterNumber}`);

        // Read the three markdown files
        const summary = readMarkdownFile(path.join(chapterPath, 'resumo.md'));
        const notes = readMarkdownFile(path.join(chapterPath, 'notas.md'));
        const body = readMarkdownFile(path.join(chapterPath, 'texto.md'));

        // Process notes: convert to array
        let notesArray = [];
        if (notes) {
            // Split by double lines (empty paragraphs)
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

    console.log(`✅ ${chapters.length} chapters processed\n`);
});

// Generate final JSON in expected format
const finalJson = books;

// Write to destination file
const outputPath = './src/data/books.json';
fs.writeFileSync(outputPath, JSON.stringify(finalJson, null, 2), 'utf8');

console.log('🎉 Build completed successfully!');
console.log(`📄 JSON generated at: ${outputPath}`);
console.log(`📊 Statistics:`);
console.log(`   - ${books.length} books`);
console.log(`   - ${books.reduce((total, book) => total + book.chapters.length, 0)} total chapters`);
