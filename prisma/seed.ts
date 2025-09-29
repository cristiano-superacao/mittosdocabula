import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Iniciando seed do banco de dados...')

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mittos.com' },
    update: {},
    create: {
      email: 'admin@mittos.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
      plan: 'DIAMANTE',
    }
  })

  console.log('Usuário admin criado:', admin.email)

  // Criar usuários de teste
  const userPassword = await bcrypt.hash('123456', 12)
  
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'joao@test.com' },
      update: {},
      create: {
        email: 'joao@test.com',
        name: 'João Silva',
        password: userPassword,
        role: 'USER',
        plan: 'OURO',
        totalWinnings: 1500.0,
        tournamentsWon: 3,
        tournamentsPlayed: 15,
        currentRanking: 1,
      }
    }),
    prisma.user.upsert({
      where: { email: 'maria@test.com' },
      update: {},
      create: {
        email: 'maria@test.com',
        name: 'Maria Santos',
        password: userPassword,
        role: 'USER',
        plan: 'PRATA',
        totalWinnings: 800.0,
        tournamentsWon: 1,
        tournamentsPlayed: 8,
        currentRanking: 2,
      }
    }),
    prisma.user.upsert({
      where: { email: 'pedro@test.com' },
      update: {},
      create: {
        email: 'pedro@test.com',
        name: 'Pedro Costa',
        password: userPassword,
        role: 'USER',
        plan: 'FREE',
        totalWinnings: 0,
        tournamentsWon: 0,
        tournamentsPlayed: 3,
        currentRanking: 15,
      }
    })
  ])

  console.log('Usuários de teste criados:', users.length)

  // Criar torneios de exemplo
  const tournaments = await Promise.all([
    prisma.tournament.create({
      data: {
        title: 'Copa Diamante - Rodada #1',
        description: 'Torneio premium com os melhores prêmios da temporada',
        category: 'DIAMANTE',
        price: 100.0,
        maxParticipants: 50,
        prize: 'R$ 5.000 + Troféu + Medalha',
        prizeAmount: 5000.0,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 dias
        endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000), // 17 dias
        rules: 'Regras específicas do torneio Diamante...',
        requirements: 'Plano Diamante ou Ouro necessário',
        isFeatured: true,
        status: 'ACTIVE'
      }
    }),
    prisma.tournament.create({
      data: {
        title: 'Liga Ouro - Classificatórias',
        description: 'Torneio classificatório para a fase final',
        category: 'OURO',
        price: 50.0,
        maxParticipants: 100,
        prize: 'R$ 2.500 + Medalha',
        prizeAmount: 2500.0,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        rules: 'Regras do torneio Ouro...',
        requirements: 'Plano Ouro ou superior',
        isFeatured: false,
        status: 'ACTIVE'
      }
    }),
    prisma.tournament.create({
      data: {
        title: 'Torneio Prata Iniciante',
        description: 'Perfeito para iniciantes que querem competir',
        category: 'PRATA',
        price: 25.0,
        maxParticipants: 200,
        prize: 'R$ 1.000 + Medalha',
        prizeAmount: 1000.0,
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        rules: 'Regras básicas para iniciantes...',
        requirements: 'Todos os planos aceitos',
        isFeatured: false,
        status: 'ACTIVE'
      }
    })
  ])

  console.log('Torneios criados:', tournaments.length)

  // Criar algumas participações
  await Promise.all([
    prisma.tournamentParticipation.create({
      data: {
        userId: users[0].id,
        tournamentId: tournaments[0].id
      }
    }),
    prisma.tournamentParticipation.create({
      data: {
        userId: users[1].id,
        tournamentId: tournaments[1].id
      }
    }),
    prisma.tournamentParticipation.create({
      data: {
        userId: users[2].id,
        tournamentId: tournaments[2].id
      }
    })
  ])

  console.log('Participações criadas')

  // Criar algumas transações
  await Promise.all([
    prisma.transaction.create({
      data: {
        userId: users[0].id,
        tournamentId: tournaments[0].id,
        type: 'TOURNAMENT_ENTRY',
        amount: 100.0,
        method: 'PIX',
        description: 'Inscrição Copa Diamante',
        status: 'COMPLETED'
      }
    }),
    prisma.transaction.create({
      data: {
        userId: users[1].id,
        tournamentId: tournaments[1].id,
        type: 'TOURNAMENT_ENTRY',
        amount: 50.0,
        method: 'PIX',
        description: 'Inscrição Liga Ouro',
        status: 'PENDING'
      }
    })
  ])

  console.log('Transações criadas')
  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })