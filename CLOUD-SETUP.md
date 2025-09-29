# ☁️ Plano de Servidor Cloud - Backend MittoS do Cabula

## 🎯 Objetivo
Configurar um servidor cloud completo para hospedar a API backend, banco de dados PostgreSQL e integração PIX para a plataforma MittoS do Cabula.

## 🏗️ Arquitetura Proposta

```
Frontend (Netlify)          Backend (Cloud)               Database
   ↓                           ↓                            ↓
📱 mittosdocabula         🚀 API Node.js/Express      🗄️ PostgreSQL
   .netlify.app          →  Heroku/Railway/Render    →  Neon/Supabase
                         →  Port: 3001/8080          →  SSL Connection
                         →  REST API + Auth          →  Prisma ORM
```

## 🛠️ Opções de Hosting Cloud

### 1. 🚀 **Railway** (Recomendado)
**Por que Railway:**
- ✅ Deploy automático via GitHub
- ✅ PostgreSQL integrado gratuito
- ✅ $5/mês por serviço (hobby plan)
- ✅ SSL automático + domínio customizado
- ✅ Logs em tempo real
- ✅ Variáveis de ambiente seguras

**URL de Deploy**: `https://mittosdocabula-api.up.railway.app`

### 2. 🎨 **Render** (Alternativa)
- ✅ Plano gratuito generoso
- ✅ PostgreSQL gerenciado
- ✅ Build automático
- ❌ Cold starts no plano gratuito

### 3. 🌟 **Heroku** (Clássico)
- ✅ Experiência consolidada
- ✅ Add-ons integrados
- ❌ Mais caro ($7/mês mínimo)
- ❌ Plano gratuito removido

## 📦 Stack do Backend

### Core Technologies
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js",
  "database": "PostgreSQL",
  "orm": "Prisma",
  "auth": "NextAuth.js + JWT",
  "payment": "PIX Integration",
  "environment": "Railway Cloud"
}
```

### 📋 Funcionalidades da API

#### 🔐 Autenticação & Usuários
- `POST /api/auth/register` - Cadastro de usuários
- `POST /api/auth/login` - Login com JWT
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

#### 🏆 Torneios
- `GET /api/tournaments` - Listar torneios
- `GET /api/tournaments/:id` - Detalhes do torneio
- `POST /api/tournaments` - Criar torneio (admin)
- `POST /api/tournaments/:id/join` - Participar do torneio

#### 💳 Pagamentos PIX
- `POST /api/payments/pix/generate` - Gerar QR Code PIX
- `POST /api/payments/pix/webhook` - Webhook confirmação
- `GET /api/payments/status/:id` - Status do pagamento

#### 👑 Admin Panel
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - Gerenciar usuários
- `GET /api/admin/tournaments` - Gerenciar torneios

## 📊 Modelo de Dados (Prisma Schema)

```prisma
// Schema base para o banco de dados
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  plan      Plan     @default(FREE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  tournamentEntries TournamentEntry[]
  payments          Payment[]
  
  @@map("users")
}

model Tournament {
  id          String     @id @default(cuid())
  name        String
  category    Category
  entryFee    Decimal
  prize       Decimal
  maxPlayers  Int
  startDate   DateTime
  endDate     DateTime
  status      TournamentStatus @default(OPEN)
  createdAt   DateTime   @default(now())
  
  entries     TournamentEntry[]
  
  @@map("tournaments")
}

model TournamentEntry {
  id           String    @id @default(cuid())
  userId       String
  tournamentId String
  joinedAt     DateTime  @default(now())
  paymentId    String?
  
  user         User      @relation(fields: [userId], references: [id])
  tournament   Tournament @relation(fields: [tournamentId], references: [id])
  payment      Payment?  @relation(fields: [paymentId], references: [id])
  
  @@unique([userId, tournamentId])
  @@map("tournament_entries")
}

model Payment {
  id            String        @id @default(cuid())
  userId        String
  amount        Decimal
  type          PaymentType
  pixCode       String?
  status        PaymentStatus @default(PENDING)
  externalId    String?
  createdAt     DateTime      @default(now())
  confirmedAt   DateTime?
  
  user          User          @relation(fields: [userId], references: [id])
  tournamentEntries TournamentEntry[]
  
  @@map("payments")
}

enum Plan {
  FREE
  SILVER
  GOLD
  DIAMOND
}

enum Category {
  DIAMOND
  GOLD
  SILVER
  SPECIAL
}

enum TournamentStatus {
  OPEN
  FULL
  RUNNING
  FINISHED
}

enum PaymentType {
  PIX
  PLAN_SUBSCRIPTION
}

enum PaymentStatus {
  PENDING
  CONFIRMED
  CANCELLED
  EXPIRED
}
```

## 🚀 Passos de Implementação

### Fase 1: Setup Inicial (2-3 horas)
1. **Criar conta no Railway**
   - Conectar GitHub
   - Deploy do backend base
   - Configurar PostgreSQL

2. **Setup do Projeto Backend**
   ```bash
   mkdir mittosdocabula-backend
   cd mittosdocabula-backend
   npm init -y
   npm install express prisma @prisma/client
   npm install -D typescript @types/node
   ```

3. **Configurar Prisma + Database**
   ```bash
   npx prisma init
   npx prisma db push
   npx prisma generate
   ```

### Fase 2: API Base (3-4 horas)
1. **Express Server Setup**
2. **Rotas de Autenticação**
3. **CRUD de Torneios**
4. **Middleware de Auth**

### Fase 3: Integração PIX (2-3 horas)
1. **API PIX Provider**
2. **Geração de QR Codes**
3. **Webhooks de Confirmação**

### Fase 4: Deploy & Testes (1-2 horas)
1. **Deploy no Railway**
2. **Conectar Frontend**
3. **Testes End-to-End**

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente (.env)
```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/mittos_db"

# Auth
JWT_SECRET="super-secret-jwt-key-2024"
NEXTAUTH_SECRET="nextauth-secret-key"

# PIX Integration
PIX_PROVIDER_API_KEY="pix-api-key"
PIX_WEBHOOK_SECRET="webhook-secret"

# App Config
PORT=3001
NODE_ENV=production
FRONTEND_URL="https://mittosdocabula.netlify.app"
```

### Railway Deployment
```json
// railway.json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

## 💰 Estimativa de Custos

### Railway (Recomendado)
- **Hobby Plan**: $5/mês por serviço
- **PostgreSQL**: Incluído no plano
- **Total**: ~$5/mês

### Neon Database (Alternativa)
- **Banco separado**: $0-19/mês
- **Permite usar Vercel/Netlify Functions**

## 🔄 Fluxo de Deploy

```mermaid
graph LR
    A[GitHub Push] --> B[Railway Detect]
    B --> C[Build Backend]
    C --> D[Deploy API]
    D --> E[Update Frontend]
    E --> F[Test Integration]
```

## 📈 Monitoramento

1. **Logs**: Railway dashboard
2. **Performance**: Response times
3. **Database**: Query optimization
4. **Errors**: Error tracking
5. **Usage**: API rate limiting

## 🎯 Próximos Passos

1. **Escolher Provider** (Railway recomendado)
2. **Criar conta e conectar GitHub**
3. **Implementar backend base**
4. **Configurar banco de dados**
5. **Deploy inicial da API**
6. **Conectar com frontend**
7. **Testes de integração**

---

**🚀 Com este setup, teremos uma infraestrutura cloud completa e escalável!**