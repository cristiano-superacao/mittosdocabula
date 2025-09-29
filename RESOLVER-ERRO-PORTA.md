# 🔧 Soluções para Erro de Porta (EADDRINUSE)

## 🚨 Problema
```
Error: listen EADDRINUSE: address already in use :::3000
```

## ✅ Soluções Aplicadas

### 1. Finalizar Processo na Porta 3000
```powershell
# Verificar processos na porta 3000
netstat -ano | findstr :3000

# Finalizar processo (substitua PID pelo número encontrado)
taskkill /PID [NUMERO_PID] /F
```

### 2. Scripts Adicionais no package.json

Para evitar conflitos futuros, você pode usar portas diferentes:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:3001": "next dev -p 3001",
    "dev:3002": "next dev -p 3002",
    "dev:auto": "next dev -p 0",
    "start": "next start",
    "start:3001": "next start -p 3001"
  }
}
```

## 🚀 Como Usar

### Opção 1: Porta Padrão (3000)
```bash
npm run dev
```

### Opção 2: Porta Alternativa (3001)
```bash
npm run dev:3001
```

### Opção 3: Porta Automática
```bash
npm run dev:auto
```

## 🔄 Comandos Úteis

### Verificar Processos Node.js
```powershell
tasklist | findstr node
```

### Finalizar Todos os Processos Node.js
```powershell
taskkill /F /IM node.exe
```

### Verificar Porta Específica
```powershell
netstat -ano | findstr :PORTA
```

## 🎯 Prevenção

1. **Sempre pare o servidor** com `Ctrl+C` antes de fechar o terminal
2. **Use portas diferentes** para projetos diferentes
3. **Verifique processos** antes de iniciar novos servidores

## ⚡ Solução Rápida

Se o erro acontecer novamente:

```powershell
# 1. Finalizar todos os processos Node.js
taskkill /F /IM node.exe

# 2. Iniciar o servidor
npm run dev
```

## 🌐 URLs de Acesso

Dependendo da porta usada:
- **Porta 3000**: http://localhost:3000
- **Porta 3001**: http://localhost:3001
- **Porta automática**: Veja no terminal qual porta foi usada

---

✅ **Problema resolvido!** O servidor deve iniciar normalmente agora.