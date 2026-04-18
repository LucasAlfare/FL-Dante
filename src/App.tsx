import MarkdownRenderer from './components/MarkdownRenderer';

function App() {
  const sampleMarkdown = `# Divina Comedia

## Introdução

A **Divina Comédia** é uma obra-prima da literatura italiana, escrita por *Dante Alighieri* no século XIV.

### Estrutura da Obra

A obra está dividida em três partes principais:

1. **Inferno** - O reino dos condenados
2. **Purgatório** - O lugar da purificação
3. **Paraíso** - O morada dos bem-aventurados

> "No meio do caminho da nossa vida, achei-me numa floresta escura, pois a reta via estava perdida."

### Personagens Principais

- **Dante** - O protagonista e narrador
- **Virgílio** - O guia através do Inferno e Purgatório
- **Beatriz** - O guia espiritual no Paraíso

\`\`\`javascript
// Exemplo de código na Divina Comédia
const jornada = {
  inferno: "sofrimento e redenção",
  purgatorio: "purificação e esperança", 
  paraiso: "luz e amor divino"
};
\`\`\`

---

*Esta é uma demonstração do componente MarkdownRenderer.*`;

  return (
    <MarkdownRenderer content={sampleMarkdown} />
  )
}

export default App
