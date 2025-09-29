# MittoS do Cabula 🏆

Uma plataforma moderna e completa para criar e gerenciar torneios de fantasy football, inspirada no rodada10.com com melhorias significativas.

## 🚀 Características Principais

- **Design Moderno e Responsivo**: Interface clean e intuitiva que funciona perfeitamente em todos os dispositivos
- **Logo Profissional**: Identidade visual única com gradientes e iconografia personalizada
- **Sistema de Categorias**: Torneios organizados em Diamante, Ouro, Prata e Especiais
- **Layout Inspirado**: Baseado no rodada10.com mas com melhorias de UX/UI
- **Tecnologia Moderna**: Next.js 14, TypeScript, Tailwind CSS

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Notificações**: React Hot Toast
- **Linting**: ESLint
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

### 🚧 Em Desenvolvimento
- [ ] Sistema de autenticação backend
- [ ] Painel administrativo
- [ ] Integração com PIX
- [ ] Banco de dados PostgreSQL
- [ ] API de torneios

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

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- NPM ou Yarn

### Instalação

1. **Clone o projeto**:
   ```bash
   git clone <repository-url>
   cd Mittos_do_Cabula_1.0
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
- `npm run build` - Gera build de produção
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

Para testar o sistema de login:
- **E-mail**: cssinformatica2008@gmail.com
- **Senha**: 01062006cs

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
└── lib/                   # Utilitários e configurações
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

1. **Autenticação Completa**
   - Integração com NextAuth.js
   - Middleware de proteção de rotas
   - Gerenciamento de sessões

2. **Banco de Dados**
   - Setup do Prisma
   - Modelos de dados
   - Migrações

3. **Painel Administrativo**
   - Dashboard de gestão
   - CRUD de torneios
   - Relatórios

4. **Integração PIX**
   - API de pagamentos
   - Webhook de confirmação
   - Gestão financeira

## 📞 Contato e Suporte

Para dúvidas, sugestões ou suporte:
- **E-mail**: contato@mittosdocabula.com
- **Versão**: 1.0.0
- **Status**: Em desenvolvimento ativo

---

**MittoS do Cabula** - A evolução das plataformas de torneios de fantasy football! 🚀⚽