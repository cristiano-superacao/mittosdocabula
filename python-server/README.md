# 🐍 Servidor Python - MittoS do Cabula

## 🚀 Instalação e Execução

### 1. Instalar Python e Dependências

```bash
# Navegar para a pasta do servidor
cd python-server

# Criar ambiente virtual (recomendado)
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
```

### 2. Executar Servidor

```bash
python app.py
```

O servidor estará disponível em: **http://localhost:5000**

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `GET /api/users/profile` - Perfil do usuário

### Torneios
- `GET /api/tournaments` - Listar todos os torneios
- `GET /api/tournaments?category=diamante` - Filtrar por categoria
- `GET /api/tournaments/<id>` - Detalhes de um torneio
- `POST /api/tournaments/<id>/join` - Entrar em torneio

### Outros
- `GET /api/plans` - Listar planos de assinatura
- `GET /api/health` - Status do servidor
- `GET /` - Informações da API

## 🎯 Credenciais de Teste

**Usuário Demo:**
- Email: `cssinformatica2008@gmail.com`
- Senha: `01062006cs`

**Admin:**
- Email: `admin@mittosdocabula.com`
- Senha: `admin123`

## 🔗 Integração com Frontend

O servidor está configurado com CORS para permitir requisições do Next.js rodando em `http://localhost:3000`.

### Exemplo de Uso no Frontend:

```javascript
// Buscar torneios
const response = await fetch('http://localhost:5000/api/tournaments');
const tournaments = await response.json();

// Login
const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 📊 Dados Mock

O servidor inclui dados de demonstração para:
- ✅ 4 torneios (Diamante, Ouro, Prata, Especial)
- ✅ 2 usuários de teste
- ✅ 4 planos de assinatura
- ✅ Estatísticas simuladas

## 🛠️ Funcionalidades

- ✅ **API REST completa**
- ✅ **CORS configurado**
- ✅ **Autenticação simulada**
- ✅ **Dados mock realistas**
- ✅ **Logs detalhados**
- ✅ **Hot reload (debug=True)**

## 🔄 Desenvolvimento

Para desenvolvimento, mantenha ambos servidores rodando:

1. **Backend Python**: `http://localhost:5000` (este servidor)
2. **Frontend Next.js**: `http://localhost:3000` (npm run dev)

## 🚀 Próximos Passos

1. Integrar com banco de dados real (PostgreSQL)
2. Implementar autenticação JWT real
3. Adicionar middleware de validação
4. Implementar testes automatizados
5. Deploy em serviço cloud (Railway, Heroku, etc.)