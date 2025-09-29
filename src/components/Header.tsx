'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Logo size="md" showText={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tournaments" className="text-gray-700 hover:text-primary-600 font-medium">
              Torneios
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              Sobre
            </Link>
            <Link href="/plans" className="text-gray-700 hover:text-primary-600 font-medium">
              Planos
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contato
            </Link>
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span>Entrar</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/tournaments" 
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Torneios
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                href="/plans" 
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <Link 
                href="/login" 
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-fit mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Entrar</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}