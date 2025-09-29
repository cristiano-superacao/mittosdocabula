# 🚀 Guia de Deploy - Conectando GitHub ao Netlify

## Passo a Passo para Deploy no Netlify

### 1. Acesse o Netlify
1. Vá para [https://netlify.com](https://netlify.com)
2. Faça login com sua conta GitHub (recomendado) ou crie uma conta

### 2. Conecte seu Repositório
1. Clique em **"Add new site"** > **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Autorize o Netlify a acessar seus repositórios GitHub
4. Procure e selecione o repositório: `cristiano-superacao/mittosdocabula`

### 3. Configurar as Opções de Build
**Use EXATAMENTE estas configurações:**

- **Site name**: `mittosdocabula` (para ter URL: mittosdocabula.netlify.app)
- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Base directory**: (deixe vazio)

### 4. Configurações Avançadas
Clique em **"Show advanced"** e adicione esta variável de ambiente:
- **Key**: `NODE_VERSION`
- **Value**: `18`

### 5. Deploy Inicial
1. Clique em **"Deploy site"**
2. Aguarde o primeiro build (pode levar 2-5 minutos)
3. O Netlify irá mostrar o progresso do build

### 6. Configurar URL Personalizada (Opcional)
Após o deploy:
1. Vá para **Site settings** > **Domain management**
2. Clique em **"Change site name"**
3. Digite: `mittosdocabula`
4. Confirme para ter URL: `https://mittosdocabula.netlify.app`

## ✅ Verificações Pós-Deploy

### Teste o Site
1. **Homepage**: Verifique se carrega com logo e torneios
2. **Navegação**: Teste links para /tournaments, /plans, /login
3. **Responsivo**: Teste em mobile e desktop
4. **Login Demo**: Use credenciais: `cssinformatica2008@gmail.com` / `01062006cs`

### Verifique Auto-Deploy
1. Faça uma pequena mudança no README.md
2. Commit e push para GitHub
3. Vá para Netlify > Deploys
4. Verifique se o novo deploy iniciou automaticamente

## 🔧 Solução de Problemas

### Se o Build Falhar
1. Verifique se as configurações estão exatas:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18`

### Se as Páginas Não Carregarem
1. Verifique se o arquivo `netlify.toml` está no repositório
2. Confirme que o redirect está configurado:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Se Imagens Não Aparecerem
- O Next.js está configurado para static export
- Imagens são otimizadas automaticamente
- Se houver problemas, verifique o `next.config.js`

## 📱 URLs Importantes

- **Site de Produção**: https://mittosdocabula.netlify.app
- **Dashboard Netlify**: https://app.netlify.com/sites/mittosdocabula
- **Repositório GitHub**: https://github.com/cristiano-superacao/mittosdocabula

## 🎯 Próximos Passos Após Deploy

1. **✅ Site Funcionando**: Verificar se todas as páginas estão acessíveis
2. **🔄 Auto-Deploy**: Confirmar que mudanças no GitHub disparam novo deploy
3. **☁️ Servidor Cloud**: Configurar backend na nuvem (Heroku/Railway/Vercel)
4. **🗄️ Banco de Dados**: Setup PostgreSQL na nuvem
5. **🔐 Auth Backend**: Implementar NextAuth.js com provider

## 💡 Dicas Importantes

- **Build Time**: Primeiros builds podem levar mais tempo
- **Caching**: Netlify cacheia assets automaticamente
- **SSL**: HTTPS é automático e gratuito
- **CDN Global**: Site será servido via CDN mundial
- **Performance**: Build otimizado para Core Web Vitals

---

**🚀 Uma vez configurado, seu site estará live em segundos a cada push!**