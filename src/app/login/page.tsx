'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulação de login/registro
    if (isLogin) {
      if (formData.email === 'cssinformatica2008@gmail.com' && formData.password === '01062006cs') {
        toast.success('Login realizado com sucesso!')
        // Aqui você redirecionaria para o dashboard
      } else {
        toast.error('Credenciais inválidas!')
      }
    } else {
      toast.success('Cadastro realizado com sucesso!')
      setIsLogin(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Logo size="lg" showText={true} className="justify-center" />
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin 
                ? 'Acesse sua conta para gerenciar seus torneios' 
                : 'Crie sua conta e comece a participar de torneios'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field pl-10"
                    placeholder="Seu nome completo"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                  Esqueceu a senha?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary text-lg py-3"
            >
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              {' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                {isLogin ? 'Criar conta' : 'Fazer login'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Credenciais de demonstração:</strong><br />
                E-mail: cssinformatica2008@gmail.com<br />
                Senha: 01062006cs
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao continuar, você concorda com nossos{' '}
          <Link href="/terms" className="text-primary-600 hover:text-primary-500">
            Termos de Uso
          </Link>
          {' '}e{' '}
          <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}