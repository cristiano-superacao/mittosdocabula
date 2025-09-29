import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Verificar se a rota é admin e se o usuário tem permissão
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (req.nextauth.token?.role !== 'ADMIN') {
        return Response.redirect(new URL('/auth/signin', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acesso às rotas públicas
        const publicRoutes = ['/auth/signin', '/auth/signup', '/']
        const isPublicRoute = publicRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        )
        
        if (isPublicRoute) return true
        
        // Exigir autenticação para outras rotas
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/tournaments/:path*',
    '/profile/:path*'
  ]
}