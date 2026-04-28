# FL-Dante: Leitor Interativo da Divina Comédia

Uma aplicação web moderna para leitura da adaptação em prosa da *Divina Comédia* de Dante Alighieri, desenvolvida com React, TypeScript e Vite. Este projeto transforma a obra-prima medieval em uma experiência digital interativa com navegação intuitiva, anotações contextuais e design responsivo.

## 📖 Sobre o Projeto

FL-Dante é um leitor digital que apresenta uma adaptação própria da *Divina Comédia* do formato poético original para prosa contemporânea em português. A aplicação oferece uma experiência de leitura imersiva com recursos modernos que facilitam a compreensão e apreciação desta obra fundamental da literatura mundial.

### A Obra

A *Divina Comédia* (1320) é um poema épico dividido em três livros:
- **Inferno** (34 cantos) - A jornada pelas nove circunferências do inferno
- **Purgatório** (33 cantos) - A ascensão pelo monte do purgatório  
- **Paraíso** (33 cantos) - A visão dos céus e a união com Deus

Cada canto foi cuidadosamente adaptado para prosa, mantendo a essência filosófica e teológica enquanto torna o texto mais acessível ao leitor contemporâneo.

## 🏗️ Arquitetura e Estrutura

### Estrutura de Diretórios

```
FL-Dante/
├── content/                   # Conteúdo literário em Markdown
│   ├── inferno/               # 34 cantos do Inferno
│   ├── purgatory/             # 33 cantos do Purgatório
│   └── paradise/              # 33 cantos do Paraíso
├── src/
│   ├── components/            # Componentes React da UI
│   │   ├── LeftPanel.tsx      # Navegação e sumário
│   │   ├── CenterPanel.tsx    # Conteúdo principal de leitura
│   │   ├── RightPanel.tsx     # Resumos e notas
│   │   └── ...                # Outros componentes
│   ├── context/               # Gerenciamento de estado
│   │   ├── ReadingContext.tsx # Estado de leitura e navegação
│   │   ├── ThemeContext.tsx   # Temas e aparência
│   │   └── SearchContext.tsx  # Funcionalidade de busca
│   ├── utils/                 # Utilitários e helpers
│   │   ├── constants.ts       # Constantes da aplicação
│   │   ├── fontStyles.ts      # Tipografia e estilos
│   │   └── romanNumerals.ts   # Conversão de números
│   └── data/                  # Dados processados
│       └── books.json         # Conteúdo compilado
├── scripts/
│   └── build-content.js       # Processamento de conteúdo
└── public/                    # Assets estáticos
```

### Estrutura de Conteúdo

Cada canto da obra é organizado em três arquivos Markdown:

- **`texto.md`** - O texto principal do canto adaptado para prosa
- **`resumo.md`** - Resumo conciso dos eventos e temas do canto
- **`notas.md`** - Anotações explicativas sobre simbolismo, contexto histórico e referências

Exemplo de estrutura:
```
content/inferno/canto-01/
├── texto.md     # Texto completo do Canto I
├── resumo.md    # Resumo do enredo e temas
└── notas.md     # Análise simbólica e contextual
```

## 🚀 Funcionalidades Principais

### Interface de Três Painéis

- **Painel Esquerdo**: Navegação estruturada com sumário dos três livros, numeração romana dos cantos e destaque para conteúdo atual
- **Painel Central**: Área principal de leitura com tipografia otimizada, suporte a Markdown e navegação entre capítulos
- **Painel Direito**: Resumo do canto atual e notas explicativas com renderização Markdown

### Sistema de Navegação

- **Navegação Sequencial**: Botões próximo/anterior com transição automática entre livros
- **Navegação Direta**: Acesso rápido a qualquer canto específico
- **Posicionamento Global**: Sistema de capítulos globais (1-100) para referência cruzada
- **Histórico de Leitura**: Manutenção do estado atual entre sessões

### Recursos de Leitura

- **Tipografia Especializada**: Fonte HaboroContrast com escalonamento responsivo
- **Renderização Markdown**: Suporte completo para formatação de texto
- **Indicador de Progresso**: Visualização da posição atual na obra
- **Design Responsivo**: Adaptável para desktop, tablet e mobile
- **Rolagem Suave**: Auto-scroll ao mudar de capítulo

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.4** - Biblioteca principal de UI
- **TypeScript 6.0.2** - Tipagem estática e desenvolvimento robusto
- **Vite 8.0.4** - Build tool rápido com HMR
- **TailwindCSS 4.2.2** - Framework de estilização utility-first

### Bibliotecas Especializadas
- **react-markdown 10.1.0** - Renderização de conteúdo Markdown
- **@tailwindcss/vite 4.2.2** - Integração TailwindCSS com Vite

### Ferramentas de Desenvolvimento
- **ESLint 9.39.4** - Linting e qualidade de código
- **pnpm** - Gerenciador de pacotes eficiente

## 🔄 Dinâmica de Desenvolvimento

### Sistema de Build

O projeto utiliza um sistema de build em duas etapas:

1. **Processamento de Conteúdo** (`scripts/build-content.js`):
   - Lê arquivos Markdown do diretório `content/`
   - Processa estrutura de livros e capítulos
   - Compila metadados e conteúdo
   - Gera `src/data/books.json` para consumo da aplicação

2. **Build da Aplicação** (Vite):
   - Compilação TypeScript e JSX
   - Processamento de estilos TailwindCSS
   - Otimização de assets e bundle

### Hot Reload de Conteúdo

Sistema customizado no Vite configura watching automático para arquivos Markdown:
- Detecção de mudanças em arquivos `.md`
- Rebuild automático do conteúdo
- Reload automático do navegador

### Fluxo de Desenvolvimento

```bash
# Instalação de dependências
pnpm install

# Desenvolvimento com hot reload
pnpm dev

# Build para produção
pnpm build

# Preview da build de produção
pnpm preview

# Processamento manual de conteúdo
pnpm build:content
```

## 🎨 Decisões de Design e Arquitetura

### Arquitetura de Componentes

- **Component-based**: Interface modularizada com responsabilidade clara
- **Context API**: Gerenciamento de estado centralizado sem prop drilling
- **Custom Hooks**: Lógica reutilizável e separação de preocupações

### Sistema de Estado

- **ReadingContext**: Gerencia navegação, conteúdo atual e estado de carregamento
- **ThemeProvider**: Controle de temas e aparência visual
- **SearchContext**: Funcionalidade de busca e filtragem de conteúdo

### Design de UI/UX

- **Layout de Três Colunas**: Maximiza uso de espaço em desktops
- **Painéis Retráteis**: Flexibilidade para diferentes tamanhos de tela
- **Tipografia Literária**: Fontes serif para experiência de leitura clássica
- **Navegação Intuitiva**: Feedback visual e transições suaves

### Processamento de Conteúdo

- **Markdown-first**: Conteúdo mantido em Markdown para versionamento e edição
- **Build-time Processing**: Compilação de conteúdo para performance
- **Estrutura Flexível**: Suporte para diferentes tipos de conteúdo por capítulo

## 📝 Estrutura de Dados

### Formato JSON Compilado

```json
[
  {
    "name": "Inferno",
    "chapters": [
      {
        "summary": "Resumo do canto...",
        "notes": ["Nota 1", "Nota 2", "..."],
        "body": "Texto completo do canto..."
      }
    ]
  }
]
```

### Sistema de Navegação

- **Capítulos Globais**: Numeração contínua (1-100) através dos três livros
- **Conversão Automática**: Mapeamento entre capítulos globais e específicos
- **Validação de Limites**: Prevenção de navegação fora dos limites da obra

## 🌐 Deploy e Configuração

### Configuração de Deploy

- **Base Path**: Configurado para `/FL-Dante/` para GitHub Pages
- **Output Directory**: `dist/` para builds de produção
- **Asset Optimization**: Cópias automáticas de arquivos públicos

### Variáveis de Ambiente

O projeto não requer variáveis de ambiente adicionais para funcionamento básico.

## 🔧 Extensões e Personalização

### Adicionando Novo Conteúdo

1. Criar diretório em `content/{livro}/canto-{XX}/`
2. Adicionar arquivos `texto.md`, `resumo.md`, `notas.md`
3. Executar `pnpm build:content` para processar
4. O sistema detecta automaticamente novo conteúdo

### Personalização Visual

- **Tipografia**: Modificar `src/utils/fontStyles.ts`
- **Cores**: Configurar através de TailwindCSS
- **Layout**: Ajustar componentes em `src/components/`

### Extensão Funcional

- **Novos Contextos**: Adicionar providers em `src/context/`
- **Utilitários**: Expandir `src/utils/`
- **Componentes**: Criar novos componentes reutilizáveis

## 📊 Estatísticas do Projeto

- **Total de Conteúdo**: 100 cantos distribuídos em 3 livros
- **Arquivos de Conteúdo**: 300 arquivos Markdown
- **Tipos de Conteúdo**: Texto principal, resumos e notas explicativas
- **Componentes React**: 18 componentes especializados
- **Contextos de Estado**: 3 provedores de contexto

## 🤝 Contribuição

### Guia de Contribuição

1. **Fork** do repositório
2. **Branch** específico para feature/fix
3. **Commits** descritivos seguindo padrão conventional
4. **Pull Request** com descrição detalhada das mudanças

### Padrões de Código

- **TypeScript**: Tipagem estrita para todos os componentes
- **ESLint**: Seguir configuração estabelecida
- **Componentes**: Documentação JSDoc para props e métodos
- **Estilos**: TailwindCSS classes e CSS-in-JS quando necessário

## 📄 Licença

Este projeto está sob licença MIT. Consulte o arquivo `LICENSE` para detalhes.

## 🙏 Agradecimentos

- A Dante Alighieri pela obra-prima que inspira este projeto
- À comunidade React e TypeScript pelas ferramentas excelentes
- Aos colaboradores que enriquecem esta adaptação com feedback e sugestões

---

**FL-Dante** - Transformando a literatura clássica em experiência digital contemporânea.
