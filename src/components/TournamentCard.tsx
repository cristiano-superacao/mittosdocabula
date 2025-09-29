import Link from 'next/link'
import { Users, Clock, Star } from 'lucide-react'

interface Tournament {
  id: string
  title: string
  description: string
  price: string
  participants: number
  maxParticipants: number
  category: string
}

interface TournamentCardProps {
  tournament: Tournament
}

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const progressPercentage = (tournament.participants / tournament.maxParticipants) * 100
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'diamante':
        return 'from-yellow-400 to-yellow-600'
      case 'ouro':
        return 'from-yellow-300 to-yellow-500'
      case 'prata':
        return 'from-gray-300 to-gray-500'
      case 'especial':
        return 'from-purple-400 to-purple-600'
      default:
        return 'from-blue-400 to-blue-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'diamante':
        return '💎'
      case 'ouro':
        return '🥇'
      case 'prata':
        return '🥈'
      case 'especial':
        return '🏆'
      default:
        return '⚽'
    }
  }

  return (
    <div className="tournament-card p-4 border-2 border-gray-100 hover:border-primary-300 transition-all duration-200">
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${getCategoryColor(tournament.category)} text-white p-2 rounded-t-lg -mx-4 -mt-4 mb-4`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{getCategoryIcon(tournament.category)} {tournament.category.toUpperCase()}</span>
          <Star className="w-4 h-4" />
        </div>
      </div>

      {/* Tournament Image Placeholder */}
      <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">{getCategoryIcon(tournament.category)}</span>
      </div>

      {/* Tournament Info */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
          {tournament.title}
        </h3>
        
        <p className="text-xs text-gray-600">
          {tournament.description}
        </p>

        {/* Price */}
        <div className="text-center">
          <span className="text-2xl font-bold text-primary-600">
            {tournament.price}
          </span>
        </div>

        {/* Participants Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{tournament.participants}/{tournament.maxParticipants}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Ativo</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/tournament/${tournament.id}`}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
        >
          Participar
        </Link>
      </div>
    </div>
  )
}