import Header from '@/components/Header'
import TournamentCard from '@/components/TournamentCard'
import { Search, Filter, SortAsc } from 'lucide-react'

// Mock tournaments data
const tournaments = [
  // Diamante tournaments
  ...Array(12).fill(null).map((_, index) => ({
    id: `diamante-${index}`,
    title: `Torneio Diamante #${index + 1}`,
    description: 'Pagamento Automatizado Via Pix',
    price: `R$ ${[1, 1.5, 2, 4, 5][index % 5]},00`,
    participants: Math.floor(Math.random() * 100),
    maxParticipants: 100,
    category: 'diamante'
  })),
  // Ouro tournaments
  ...Array(8).fill(null).map((_, index) => ({
    id: `ouro-${index}`,
    title: `Torneio Ouro #${index + 1}`,
    description: 'Pagamento Automatizado Via Pix',
    price: `R$ ${[3, 5, 1, 2, 4][index % 5]},00`,
    participants: Math.floor(Math.random() * 80),
    maxParticipants: 80,
    category: 'ouro'
  })),
  // Prata tournaments
  ...Array(15).fill(null).map((_, index) => ({
    id: `prata-${index}`,
    title: `Torneio Prata #${index + 1}`,
    description: 'Pagamento Automatizado Via Pix',
    price: `R$ ${[10, 7, 5, 15, 20][index % 5]},00`,
    participants: Math.floor(Math.random() * 60),
    maxParticipants: 60,
    category: 'prata'
  })),
  // Especial tournaments
  ...Array(6).fill(null).map((_, index) => ({
    id: `especial-${index}`,
    title: `Torneio Especial #${index + 1}`,
    description: 'Pagamento Automatizado Via Pix',
    price: `R$ ${[30, 20, 100, 35, 25][index % 5]},00`,
    participants: Math.floor(Math.random() * 40),
    maxParticipants: 40,
    category: 'especial'
  }))
]

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todos os Torneios
          </h1>
          <p className="text-xl text-gray-600">
            Encontre o torneio perfeito para você
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar torneios..."
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="input-field pl-10 appearance-none">
                <option value="">Todas as categorias</option>
                <option value="diamante">Diamante</option>
                <option value="ouro">Ouro</option>
                <option value="prata">Prata</option>
                <option value="especial">Especial</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="input-field pl-10 appearance-none">
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="participants">Mais participantes</option>
                <option value="newest">Mais recentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-primary-600">{tournaments.length}</div>
            <div className="text-sm text-gray-600">Total de Torneios</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-success-600">
              {tournaments.filter(t => t.category === 'diamante').length}
            </div>
            <div className="text-sm text-gray-600">Categoria Diamante</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-warning-600">
              {tournaments.reduce((sum, t) => sum + t.participants, 0)}
            </div>
            <div className="text-sm text-gray-600">Total de Participantes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-secondary-600">24h</div>
            <div className="text-sm text-gray-600">Suporte Online</div>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="space-y-8">
          {/* Diamante Section */}
          <section>
            <h2 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center">
              💎 Categoria Diamante
              <span className="ml-4 text-sm font-normal bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                {tournaments.filter(t => t.category === 'diamante').length} torneios
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tournaments
                .filter(tournament => tournament.category === 'diamante')
                .map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))
              }
            </div>
          </section>

          {/* Ouro Section */}
          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center">
              🥇 Categoria Ouro
              <span className="ml-4 text-sm font-normal bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                {tournaments.filter(t => t.category === 'ouro').length} torneios
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tournaments
                .filter(tournament => tournament.category === 'ouro')
                .map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))
              }
            </div>
          </section>

          {/* Prata Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-500 mb-6 flex items-center">
              🥈 Categoria Prata
              <span className="ml-4 text-sm font-normal bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                {tournaments.filter(t => t.category === 'prata').length} torneios
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tournaments
                .filter(tournament => tournament.category === 'prata')
                .map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))
              }
            </div>
          </section>

          {/* Especial Section */}
          <section>
            <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
              🏆 Torneios Especiais
              <span className="ml-4 text-sm font-normal bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {tournaments.filter(t => t.category === 'especial').length} torneios
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tournaments
                .filter(tournament => tournament.category === 'especial')
                .map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}