# 🚀 Guia Completo de Deploy - MittoS do Cabula

## 📋 Visão Geral

Este projeto foi otimizado para funcionar perfeitamente em **Netlify**, **Vercel** e **desenvolvimento local** com servidor Python para testes de API.

## 🏗️ Configurações de Build

### Para Netlify (Static Export)
```bash
npm run build:netlify
```

### Para Vercel (Server-Side)
```bash
npm run build:vercel
```

### Análise de Bundle
```bash
npm run build:analyze
```

## 🌐 Deploy no Netlify

### Configuração Automática

1. **Conecte o repositório**:
   - Vá para [netlify.com](https://netlify.com)
   - "Add new site" → "Import existing project"
   - Conecte com GitHub: `cristiano-superacao/mittosdocabula`

2. **Configurações de Build** (já configuradas via `netlify.toml`):
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `out`
   - **Node version**: `18`

3. **Variáveis de Ambiente**:
   ```
   NODE_ENV=production
   BUILD_EXPORT=true
   NETLIFY_URL=https://mittosdocabula.netlify.app
   ```

### Configuração Manual

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build e deploy
npm run build:netlify
netlify deploy --prod --dir=out
```

## ⚡ Deploy no Vercel

### Configuração Automática

1. **Conecte o repositório**:
   - Vá para [vercel.com](https://vercel.com)
   - "Add New" → "Project"
   - Import do GitHub: `cristiano-superacao/mittosdocabula`

2. **Configurações** (detectadas automaticamente):
   - **Framework**: Next.js
   - **Build Command**: `npm run build:vercel`
   - **Output Directory**: `.next`

3. **Variáveis de Ambiente**:
   ```
   NODE_ENV=production
   BUILD_STANDALONE=false
   ```

### Configuração Manual

```bash
# Install Vercel CLI
npm install -g vercel

# Build e deploy
npm run build:vercel
vercel --prod
```

## 🐍 Desenvolvimento Local com Python

### Setup do Servidor Python

```bash
# 1. Instalar dependências Python
npm run python:install

# 2. Executar servidor Python (porta 5000)
npm run python:dev
```

### Desenvolvimento Full-Stack

```bash
# Executar frontend + backend simultaneamente
npm run dev:full

# Ou separadamente:
# Terminal 1: Backend Python
npm run python:dev

# Terminal 2: Frontend Next.js  
npm run dev
```

### URLs de Desenvolvimento
- **Frontend**: http://localhost:3000
- **API Python**: http://localhost:5000
- **API Docs**: http://localhost:5000/api

## 🔧 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev              # Next.js porta 3000
npm run dev:3001         # Next.js porta 3001
npm run dev:auto         # Next.js porta automática
npm run python:dev       # Servidor Python
npm run dev:full         # Frontend + Backend
```

### Build e Deploy
```bash
npm run build            # Build padrão
npm run build:netlify    # Build para Netlify (static)
npm run build:vercel     # Build para Vercel (SSR)
npm run build:analyze    # Análise de bundle
npm run deploy:netlify   # Deploy direto Netlify
npm run deploy:vercel    # Deploy direto Vercel
```

### Utilitários
```bash
npm run lint             # ESLint
npm run lint:fix         # ESLint com correção
npm run type-check       # TypeScript check
npm run clean            # Limpar builds
```

## 📊 Performance e Otimizações

### Funcionalidades Implementadas

- ✅ **Bundle Splitting** automático
- ✅ **Image Optimization** (WebP, AVIF)
- ✅ **Code Minification** (SWC)
- ✅ **Static Generation** para Netlify
- ✅ **Server-Side Rendering** para Vercel
- ✅ **Headers de Segurança**
- ✅ **Cache Otimizado**
- ✅ **Bundle Analysis** disponível

### Headers de Performance

Configurados automaticamente:
- **Cache-Control** para assets estáticos
- **X-Frame-Options** para segurança
- **Content-Security-Policy** básico
- **X-DNS-Prefetch-Control** otimizado

## 🔐 Variáveis de Ambiente

### Arquivo `.env.local` (desenvolvimento)

```env
NODE_ENV=development
API_URL=http://localhost:5000
SITE_URL=http://localhost:3000
```

### Variáveis de Produção

#### Netlify
```env
NODE_ENV=production
BUILD_EXPORT=true
NETLIFY_URL=https://mittosdocabula.netlify.app
```

#### Vercel
```env
NODE_ENV=production
BUILD_STANDALONE=false
VERCEL_URL=https://mittosdocabula.vercel.app
```

## 🎯 URLs de Produção

### Netlify
- **Site**: https://mittosdocabula.netlify.app
- **Admin**: https://app.netlify.com/sites/mittosdocabula

### Vercel
- **Site**: https://mittosdocabula.vercel.app
- **Admin**: https://vercel.com/dashboard

### GitHub
- **Repositório**: https://github.com/cristiano-superacao/mittosdocabula

## 🐛 Troubleshooting

### Build Errors

**Erro de Porta (EADDRINUSE)**:
```bash
# Finalizar processos Node.js
taskkill /F /IM node.exe

# Usar porta alternativa
npm run dev:3001
```

**Erro de Build Netlify**:
```bash
# Verificar se o build funciona localmente
npm run build:netlify

# Verificar logs no Netlify Dashboard
```

**Erro de Build Vercel**:
```bash
# Build local
npm run build:vercel

# Verificar logs no Vercel Dashboard
```

### Deploy Issues

**404 no Netlify**:
- Verificar se `netlify.toml` está correto
- Confirmar que `out/` foi gerado
- Verificar redirects

**Erro no Vercel**:
- Verificar `vercel.json`
- Confirmar configurações de função
- Verificar logs de build

## 📈 Monitoramento

### Bundle Analysis

```bash
npm run build:analyze
```

Isso abrirá um relatório visual do bundle mostrando:
- Tamanho dos componentes
- Dependências não utilizadas
- Oportunidades de otimização

### Performance Metrics

O projeto está configurado para Core Web Vitals:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)  
- **CLS** (Cumulative Layout Shift)

## 🔄 CI/CD Workflow

### GitHub Actions (Futuro)

O projeto está preparado para:
1. **Testes automatizados**
2. **Build verification**
3. **Deploy automático**
4. **Security scanning**

## 📞 Suporte

Para problemas específicos:

1. **Verificar logs** na plataforma de deploy
2. **Testar build local** primeiro
3. **Verificar variáveis** de ambiente
4. **Consultar documentação** específica da plataforma

---

🎉 **Projeto otimizado para máxima performance e compatibilidade!**