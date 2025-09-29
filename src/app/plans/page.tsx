import Header from '@/components/Header'
import { Check, Star, Crown, Gem } from 'lucide-react'

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/mês',
    description: 'Perfeito para começar',
    icon: Star,
    color: 'gray',
    features: [
      'Até 3 torneios por mês',
      'Máximo 10 participantes',
      'Suporte por email',
      'Dashboard básico',
      'Estatísticas simples'
    ],
    limitations: [
      'Sem pagamento automático',
      'Sem customização'
    ]
  },
  {
    name: 'Prata',
    price: 'R$ 29',
    period: '/mês',
    description: 'Para organizadores ativos',
    icon: Crown,
    color: 'gray',
    popular: false,
    features: [
      'Até 10 torneios por mês',
      'Máximo 50 participantes',
      'Pagamento automático via PIX',
      'Dashboard avançado',
      'Estatísticas detalhadas',
      'Suporte prioritário',
      'Customização básica'
    ]
  },
  {
    name: 'Ouro',
    price: 'R$ 59',
    period: '/mês',
    description: 'Para profissionais sérios',
    icon: Crown,
    color: 'yellow',
    popular: true,
    features: [
      'Torneios ilimitados',
      'Participantes ilimitados',
      'Pagamento automático via PIX',
      'Dashboard premium',
      'Relatórios avançados',
      'Suporte 24/7',
      'Customização completa',
      'API de integração',
      'White label'
    ]
  },
  {
    name: 'Diamante',
    price: 'R$ 99',
    period: '/mês',
    description: 'Para empresas e ligas',
    icon: Gem,
    color: 'blue',
    features: [
      'Tudo do plano Ouro',
      'Múltiplas marcas',
      'Gerenciamento de equipe',
      'Relatórios personalizados',
      'Integração com redes sociais',
      'Suporte dedicado',
      'Treinamento incluso',
      'SLA garantido',
      'Backup automático'
    ]
  }
]

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre o plano perfeito para suas necessidades. Comece gratuitamente 
            e upgrade conforme seu crescimento.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <div
                key={index}
                className={`
                  relative bg-white rounded-2xl shadow-xl p-8 
                  ${plan.popular ? 'ring-4 ring-primary-500 scale-105' : ''}
                  hover:shadow-2xl transition-all duration-300
                `}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}

                {/* Plan Icon */}
                <div className={`
                  w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center
                  ${plan.color === 'gray' ? 'bg-gray-100' : 
                    plan.color === 'yellow' ? 'bg-yellow-100' : 
                    'bg-blue-100'}
                `}>
                  <IconComponent className={`
                    w-8 h-8
                    ${plan.color === 'gray' ? 'text-gray-600' : 
                      plan.color === 'yellow' ? 'text-yellow-600' : 
                      'text-blue-600'}
                  `} />
                </div>

                {/* Plan Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                    <li key={limitIndex} className="flex items-start opacity-60">
                      <span className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400">×</span>
                      <span className="text-gray-500 text-sm line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`
                  w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200
                  ${plan.popular 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }
                `}>
                  {index === 0 ? 'Começar Grátis' : 'Assinar Agora'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Compare os Recursos
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 font-semibold text-gray-900">Recursos</th>
                  {plans.map((plan, index) => (
                    <th key={index} className="text-center py-4 font-semibold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Torneios por mês</td>
                  <td className="text-center py-4">3</td>
                  <td className="text-center py-4">10</td>
                  <td className="text-center py-4">Ilimitado</td>
                  <td className="text-center py-4">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Participantes máximo</td>
                  <td className="text-center py-4">10</td>
                  <td className="text-center py-4">50</td>
                  <td className="text-center py-4">Ilimitado</td>
                  <td className="text-center py-4">Ilimitado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Pagamento automático PIX</td>
                  <td className="text-center py-4 text-red-500">×</td>
                  <td className="text-center py-4 text-green-500">✓</td>
                  <td className="text-center py-4 text-green-500">✓</td>
                  <td className="text-center py-4 text-green-500">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Suporte</td>
                  <td className="text-center py-4">Email</td>
                  <td className="text-center py-4">Prioritário</td>
                  <td className="text-center py-4">24/7</td>
                  <td className="text-center py-4">Dedicado</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-gray-700">Customização</td>
                  <td className="text-center py-4 text-red-500">×</td>
                  <td className="text-center py-4">Básica</td>
                  <td className="text-center py-4">Completa</td>
                  <td className="text-center py-4">Empresarial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Posso mudar de plano?</h3>
              <p className="text-gray-600 text-sm">
                Sim! Você pode fazer upgrade ou downgrade a qualquer momento. 
                As mudanças são aplicadas no próximo ciclo de cobrança.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Há período de carência?</h3>
              <p className="text-gray-600 text-sm">
                Não! Você pode cancelar a qualquer momento. Não cobramos multas 
                ou taxas de cancelamento.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Como funciona o PIX?</h3>
              <p className="text-gray-600 text-sm">
                O pagamento via PIX é automático e instantâneo. Os participantes 
                pagam diretamente e você recebe na hora.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2">Há teste grátis?</h3>
              <p className="text-gray-600 text-sm">
                Sim! O plano gratuito permite testar a plataforma. Para recursos 
                avançados, oferecemos 7 dias grátis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}