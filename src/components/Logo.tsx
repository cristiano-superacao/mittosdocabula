import { Trophy } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dark' | 'white'
  showText?: boolean
  className?: string
}

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  showText = true,
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-sm',
      subtext: 'text-xs'
    },
    md: {
      container: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-lg',
      subtext: 'text-xs'
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
      text: 'text-xl',
      subtext: 'text-sm'
    },
    xl: {
      container: 'w-24 h-24',
      icon: 'w-12 h-12',
      text: 'text-3xl',
      subtext: 'text-lg'
    }
  }

  const variantClasses = {
    default: {
      background: 'bg-gradient-to-br from-primary-600 to-secondary-600',
      icon: 'text-white',
      text: 'text-gray-900',
      subtext: 'text-gray-600'
    },
    dark: {
      background: 'bg-gradient-to-br from-gray-800 to-gray-900',
      icon: 'text-white',
      text: 'text-gray-100',
      subtext: 'text-gray-300'
    },
    white: {
      background: 'bg-gradient-to-br from-white to-gray-100 border-2 border-gray-200',
      icon: 'text-primary-600',
      text: 'text-gray-900',
      subtext: 'text-gray-600'
    }
  }

  const sizeConfig = sizeClasses[size]
  const variantConfig = variantClasses[variant]

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`
        ${sizeConfig.container} 
        ${variantConfig.background}
        rounded-xl 
        flex 
        items-center 
        justify-center
        shadow-lg
        relative
        overflow-hidden
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-1 w-1 h-1 bg-white rounded-full"></div>
        </div>
        
        {/* Main Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {size === 'xl' ? (
            <div className="text-center">
              <Trophy className={`${sizeConfig.icon} ${variantConfig.icon} mx-auto mb-1`} />
              <div className="text-white font-bold text-sm">MC</div>
            </div>
          ) : (
            <Trophy className={`${sizeConfig.icon} ${variantConfig.icon}`} />
          )}
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex-1">
          <h1 className={`
            ${sizeConfig.text} 
            ${variantConfig.text}
            font-bold 
            leading-tight
          `}>
            <span className="text-primary-600">MittoS</span> do Cabula
          </h1>
          <p className={`
            ${sizeConfig.subtext} 
            ${variantConfig.subtext}
            leading-tight
          `}>
            Plataforma de torneios
          </p>
        </div>
      )}
    </div>
  )
}

// Componente especializado para favicon/ícone pequeno
export function LogoIcon({ className = '', size = 32 }: { className?: string, size?: number }) {
  return (
    <div 
      className={`bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Trophy className="text-white" style={{ width: size * 0.6, height: size * 0.6 }} />
    </div>
  )
}