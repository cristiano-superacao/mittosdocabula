# MittoS do Cabula 🏆

Uma plataforma moderna e completa para criar e gerenciar torneios de fantasy football, inspirada no rodada10.com com melhorias significativas.

## 🌐 Links Ativos

- **🌍 Site Live**: [https://mittosdocabula.netlify.app](https://mittosdocabula.netlify.app)
- **📁 Repositório GitHub**: [https://github.com/cristiano-superacao/mittosdocabula](https://github.com/cristiano-superacao/mittosdocabula)
- **⚡ Deploy Status**: [![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/mittosdocabula/deploys)

## 🚀 Características Principais

- **Design Moderno e Responsivo**: Interface clean e intuitiva que funciona perfeitamente em todos os dispositivos
- **Logo Profissional**: Identidade visual única com gradientes e iconografia personalizada
- **Sistema de Categorias**: Torneios organizados em Diamante, Ouro, Prata e Especiais
- **Layout Inspirado**: Baseado no rodada10.com mas com melhorias de UX/UI
- **Tecnologia Moderna**: Next.js 14, TypeScript, Tailwind CSS
- **Deploy Automático**: GitHub → Netlify com CI/CD

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 with App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS with PostCSS
- **Ícones**: Lucide React
- **Notificações**: React Hot Toast
- **Forms**: React Hook Form
- **Linting**: ESLint
- **Deploy**: Netlify with automatic builds
- **Autenticação**: NextAuth.js (preparado)
- **Banco de Dados**: Prisma + PostgreSQL (preparado)

## 📋 Funcionalidades Implementadas

### ✅ Concluído

- [x] Estrutura base do projeto Next.js
- [x] Logo profissional com múltiplas variações
- [x] Layout responsivo completo
- [x] Página inicial com listagem de torneios
- [x] Página de todos os torneios com filtros
- [x] Página de planos e preços
- [x] Sistema de login/registro (frontend)
- [x] Componentes reutilizáveis
- [x] Design system completo
- [x] **Deploy no GitHub e Netlify**
- [x] **Build estático otimizado**
- [x] **CI/CD configurado**

### 🚧 Em Desenvolvimento

- [ ] Sistema de autenticação backend
- [ ] Painel administrativo
- [ ] Integração com PIX
- [ ] Banco de dados PostgreSQL
- [ ] API de torneios
- [ ] Servidor cloud backend

## 🚀 Deploy e Hospedagem

### Configuração de Deploy

O projeto está configurado para deploy automático:

**GitHub → Netlify Pipeline:**
1. Push para branch `main` no GitHub
2. Netlify detecta mudanças automaticamente
3. Build com `npm run build` (Next.js static export)
4. Deploy para `https://mittosdocabula.netlify.app`

### Configurações de Build

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Comandos de Deploy Local

```bash
# Build para produção
npm run build

# Preview do build
npm start

# Deploy via git
git add .
git commit -m "Deploy update"
git push origin main  # Auto-deploy para Netlify
```

## 🎨 Design System

### Cores Principais

- **Primary**: Tons de azul (#3b82f6)
- **Secondary**: Tons de ciano (#0ea5e9)
- **Success**: Verde (#22c55e)
- **Warning**: Amarelo (#f59e0b)
- **Danger**: Vermelho (#ef4444)

### Categorias de Torneios

- **💎 Diamante**: Torneios premium com valores baixos
- **🥇 Ouro**: Torneios intermediários
- **🥈 Prata**: Torneios de valor médio e alto
- **🏆 Especiais**: Torneios mensais e eliminação

## 💻 Como Executar Localmente

### Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Git

### Instalação e Execução

1. **Clone o projeto**:
   ```bash
   git clone https://github.com/cristiano-superacao/mittosdocabula.git
   cd mittosdocabula
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção (static export)
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linting do código

## 📱 Páginas Implementadas

### 🏠 Página Inicial (`/`)
- Hero section com logo e call-to-actions
- Listagem de torneios por categoria
- Seção de funcionalidades
- Footer informativo

### 🏆 Torneios (`/tournaments`)
- Listagem completa de todos os torneios
- Sistema de filtros por categoria
- Estatísticas em tempo real
- Layout em grid responsivo

### 💳 Planos (`/plans`)
- 4 planos: Gratuito, Prata, Ouro, Diamante
- Tabela comparativa de recursos
- FAQ integrada
- Design moderno com badges

### 🔐 Login (`/login`)
- Formulário de login/registro
- Credenciais de demonstração incluídas
- Design responsivo
- Validação de campos

## 🎯 Credenciais de Demonstração

Para testar o sistema de login no site live:
- **E-mail**: `cssinformatica2008@gmail.com`
- **Senha**: `01062006cs`

## 🔧 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── login/             # Página de login
│   ├── tournaments/       # Página de torneios
│   └── plans/             # Página de planos
├── components/             # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho principal
│   ├── Logo.tsx           # Componente de logo
│   ├── TournamentCard.tsx # Card de torneio
│   └── FeaturesSection.tsx # Seção de recursos
├── netlify.toml           # Configuração de deploy
├── next.config.js         # Config Next.js + static export
└── package.json           # Dependências e scripts
```

## 🎨 Componentes Principais

### Logo
Componente flexível com múltiplas variações:
```tsx
<Logo size="lg" variant="default" showText={true} />
```

### TournamentCard
Card para exibição de torneios com:
- Indicador de categoria
- Barra de progresso de participantes
- Preço em destaque
- Call-to-action

### Header
Navegação responsiva com:
- Logo interativo
- Menu mobile
- Botão de login
- Links principais

## 🚀 Próximos Passos

1. **Servidor Cloud Backend**
   - Setup de servidor na nuvem
   - API REST com Node.js/Express
   - Conectar com frontend

2. **Autenticação Completa**
   - Integração com NextAuth.js
   - Middleware de proteção de rotas
   - Gerenciamento de sessões

3. **Banco de Dados**
   - Setup do Prisma
   - PostgreSQL na nuvem
   - Modelos de dados

4. **Painel Administrativo**
   - Dashboard de gestão
   - CRUD de torneios
   - Relatórios

5. **Integração PIX**
   - API de pagamentos
   - Webhook de confirmação
   - Gestão financeira

## 🔄 Workflow de Desenvolvimento

```bash
# 1. Desenvolvimento local
npm run dev

# 2. Teste mudanças
npm run build && npm start

# 3. Commit e push
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# 4. Deploy automático no Netlify ✨
```

## 📊 Status do Projeto

- **Versão**: 1.0.0
- **Status**: ✅ Frontend Completo + Deploy Ativo
- **Ambiente de Produção**: [mittosdocabula.netlify.app](https://mittosdocabula.netlify.app)
- **Último Deploy**: Automático via GitHub
- **Performance**: PWA-ready, Core Web Vitals otimizados

## 📞 Contato e Suporte

**Cristiano Superação**
- **E-mail**: cssinformatica2008@gmail.com
- **GitHub**: [@cristiano-superacao](https://github.com/cristiano-superacao)
- **LinkedIn**: [Cristiano Superação](https://linkedin.com/in/cristiano-superacao)

---

**MittoS do Cabula** - A evolução das plataformas de torneios de fantasy football! 🚀⚽

*Desenvolvido com ❤️ para a comunidade de Fantasy Football do Cabula*