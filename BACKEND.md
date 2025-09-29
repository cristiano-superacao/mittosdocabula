# Backend do MittoS do Cabula

Sistema completo de backend implementado com:

## 🗄️ Banco de Dados PostgreSQL + Prisma

### Modelos Implementados:
- **User**: Usuários com roles (USER, ADMIN, MODERATOR) e planos (FREE, PRATA, OURO, DIAMANTE)
- **Tournament**: Torneios com categorias, preços, participantes e prêmios
- **TournamentParticipation**: Participações dos usuários nos torneios
- **Transaction**: Transações PIX e outros métodos de pagamento
- **Subscription**: Assinaturas dos planos premium
- **Account/Session**: Autenticação NextAuth.js
- **AdminLog**: Logs de ações administrativas

### Comandos Prisma:
```bash
npm run db:generate   # Gerar cliente Prisma
npm run db:push      # Aplicar schema ao banco
npm run db:migrate   # Executar migrações
npm run db:studio    # Abrir Prisma Studio
npm run db:seed      # Popular banco com dados de teste
```

## 🔐 Sistema de Autenticação

### NextAuth.js Configurado:
- Autenticação por credenciais (email/senha)
- Integração com Google OAuth (opcional)
- Middleware de proteção de rotas
- Roles e permissões (USER, ADMIN, MODERATOR)
- JWT tokens com informações do usuário

### Rotas Protegidas:
- `/dashboard/*` - Usuários autenticados
- `/admin/*` - Apenas administradores
- `/tournaments/*` - Usuários autenticados
- `/profile/*` - Usuários autenticados

## 🏆 API de Torneios

### Endpoints Implementados:
- `GET /api/tournaments` - Listar torneios com filtros
- `POST /api/tournaments` - Criar torneio (admin)
- `GET /api/tournaments/[id]` - Detalhes do torneio
- `PUT /api/tournaments/[id]` - Atualizar torneio (admin)
- `DELETE /api/tournaments/[id]` - Deletar torneio (admin)
- `POST /api/tournaments/[id]/join` - Inscrever-se no torneio
- `DELETE /api/tournaments/[id]/join` - Cancelar inscrição

### Funcionalidades:
- Filtros por categoria, status, busca
- Paginação automática
- Verificação de vagas disponíveis
- Verificação de prazo de inscrição
- Atualização automática de status (ACTIVE → FULL)

## 💳 Integração PIX

### Endpoints PIX:
- `POST /api/payments/pix` - Gerar pagamento PIX
- `GET /api/payments/pix` - Consultar status do pagamento
- `POST /api/payments/webhook` - Webhook para confirmação

### Funcionalidades:
- Geração de código PIX
- QR Code para pagamento
- Webhook para confirmação automática
- Histórico de transações
- Diferentes tipos de pagamento (inscrição, assinatura, etc.)

## 👥 Sistema de Usuários

### Endpoints:
- `POST /api/auth/register` - Cadastro de usuário
- `GET /api/user/profile` - Perfil do usuário
- `PUT /api/user/profile` - Atualizar perfil
- `GET /api/user/tournaments` - Torneios do usuário

### Dados do Perfil:
- Informações básicas (nome, email, telefone)
- Estatísticas (ganhos, torneios, ranking)
- Histórico de participações
- Plano atual e benefícios

## 🛡️ Painel Administrativo

### Endpoints Admin:
- `GET /api/admin/dashboard` - Estatísticas gerais
- `GET /api/admin/users` - Gerenciar usuários
- `GET /api/admin/transactions` - Visualizar transações

### Funcionalidades:
- Dashboard com métricas em tempo real
- Gestão completa de usuários
- Monitoramento de transações
- Logs de ações administrativas
- Relatórios e estatísticas

## 🚀 Configuração e Deploy

### Variáveis de Ambiente (.env.local):
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mittos_cabula"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui"
PIX_API_KEY="sua-chave-pix"
```

### Scripts de Desenvolvimento:
```bash
npm run dev:full     # Executar Next.js + Python server
npm run db:seed      # Popular banco com dados de teste
npm run build        # Build para produção
```

### Dados de Teste Criados:
- **Admin**: admin@mittos.com / admin123
- **Usuários**: joao@test.com, maria@test.com, pedro@test.com / 123456
- **3 Torneios** de exemplo em diferentes categorias
- **Participações e transações** de exemplo

## 📋 Próximos Passos

1. **Configurar PostgreSQL**: Instalar e configurar banco local/cloud
2. **Executar Migrações**: `npm run db:push`
3. **Popular Dados**: `npm run db:seed`
4. **Testar APIs**: Usar Prisma Studio ou Postman
5. **Deploy**: Configurar Vercel/Railway com banco PostgreSQL

## 🔧 Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Prisma** - ORM e migrations
- **NextAuth.js** - Autenticação
- **PostgreSQL** - Banco de dados
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de dados
- **JWT** - Tokens de autenticação