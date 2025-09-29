import Link from 'next/link'
import { Trophy, Users, Shield, Share2 } from 'lucide-react'
import Header from '@/components/Header'
import TournamentCard from '@/components/TournamentCard'
import FeaturesSection from '@/components/FeaturesSection'

// Mock data for tournaments
const mockTournaments = [
  {
    id: '1',
    title: 'DIAMANTE RDD#25',
    description: 'Pagamento Automatizado Via Pix',
    price: 'R$ 1,00',
    participants: 150,
    maxParticipants: 200,
    category: 'diamante'
  },
  {
    id: '2',
    title: 'OURO RDD#25',
    description: 'Pagamento Automatizado Via Pix',
    price: 'R$ 5,00',
    participants: 89,
    maxParticipants: 100,
    category: 'ouro'
  },
  {
    id: '3',
    title: 'PRATA RDD#25 (MAIS DE $7)',
    description: 'Pagamento Automatizado Via Pix',
    price: 'R$ 10,00',
    participants: 45,
    maxParticipants: 50,
    category: 'prata'
  },
  {
    id: '4',
    title: 'MENSAL E ELIMINAÇÃO',
    description: 'Pagamento Automatizado Via Pix',
    price: 'R$ 30,00',
    participants: 25,
    maxParticipants: 30,
    category: 'especial'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
              <span className="text-primary-600">MittoS</span> do Cabula
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Plataforma de Torneios de Fantasy Football
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/tournaments" className="btn-primary text-lg px-8 py-3">
              Acesse seus Torneios
            </Link>
            <Link href="/plans" className="btn-secondary text-lg px-8 py-3">
              Planos
            </Link>
          </div>
          
          {/* Banner Image Placeholder */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white mb-12">
            <h2 className="text-2xl font-bold mb-2">🏆 Torneio Principal</h2>
            <p className="text-lg">Participe do maior torneio da temporada!</p>
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Torneios Disponíveis
          </h2>
          
          <div className="space-y-12">
            {/* Diamante Category */}
            <div>
              <h3 className="text-2xl font-bold text-yellow-600 mb-6">DIAMANTE RDD#25</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(null).map((_, index) => (
                  <TournamentCard
                    key={`diamante-${index}`}
                    tournament={{
                      id: `diamante-${index}`,
                      title: 'Torneio Diamante',
                      description: 'Pagamento Automatizado Via Pix',
                      price: `R$ ${[1, 1.5, 2, 4, 5][index % 5]},00`,
                      participants: Math.floor(Math.random() * 100),
                      maxParticipants: 100,
                      category: 'diamante'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Ouro Category */}
            <div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-6">OURO RDD#25</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(6).fill(null).map((_, index) => (
                  <TournamentCard
                    key={`ouro-${index}`}
                    tournament={{
                      id: `ouro-${index}`,
                      title: 'Torneio Ouro',
                      description: 'Pagamento Automatizado Via Pix',
                      price: `R$ ${[3, 5, 1, 2, 4][index % 5]},00`,
                      participants: Math.floor(Math.random() * 80),
                      maxParticipants: 80,
                      category: 'ouro'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Prata Category */}
            <div>
              <h3 className="text-2xl font-bold text-gray-500 mb-6">PRATA RDD#25</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(12).fill(null).map((_, index) => (
                  <TournamentCard
                    key={`prata-${index}`}
                    tournament={{
                      id: `prata-${index}`,
                      title: 'Torneio Prata',
                      description: 'Pagamento Automatizado Via Pix',
                      price: `R$ ${[10, 7, 5, 15, 20][index % 5]},00`,
                      participants: Math.floor(Math.random() * 60),
                      maxParticipants: 60,
                      category: 'prata'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Especial Category */}
            <div>
              <h3 className="text-2xl font-bold text-purple-600 mb-6">MENSAL E ELIMINAÇÃO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(6).fill(null).map((_, index) => (
                  <TournamentCard
                    key={`especial-${index}`}
                    tournament={{
                      id: `especial-${index}`,
                      title: 'Torneio Especial',
                      description: 'Pagamento Automatizado Via Pix',
                      price: `R$ ${[30, 20, 100, 35, 25][index % 5]},00`,
                      participants: Math.floor(Math.random() * 40),
                      maxParticipants: 40,
                      category: 'especial'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">MittoS do Cabula - Versão 1.0.0</p>
          <p className="text-gray-400">
            © 2024 MittoS do Cabula. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}