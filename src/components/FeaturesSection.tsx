import { Trophy, Users, Shield, Share2 } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Trophy,
      title: 'Administre',
      description: 'Crie e gerencie torneios para se divertir com a galera'
    },
    {
      icon: Users,
      title: 'Participe',
      description: 'Existem milhares de torneio pra você participar'
    },
    {
      icon: Shield,
      title: 'Automatize',
      description: 'Com o pix fica fácil receber a inscrição'
    },
    {
      icon: Share2,
      title: 'Compartilhe',
      description: 'Sua página para demonstrar todos os seus torneios'
    }
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Funcionalidades
          </h2>
          <p className="text-xl text-gray-600">
            Gerencie seu torneio de forma divertida e fácil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Additional Visual Element */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">🎯 Plataforma Completa</h3>
            <p className="text-lg">
              Tudo que você precisa para gerenciar torneios de fantasy football
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}