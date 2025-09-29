import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Estatísticas gerais
    const stats = await Promise.all([
      // Total de usuários
      prisma.user.count(),
      
      // Total de torneios
      prisma.tournament.count(),
      
      // Total de transações
      prisma.transaction.count(),
      
      // Receita total
      prisma.transaction.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      }),
      
      // Usuários por plano
      prisma.user.groupBy({
        by: ['plan'],
        _count: { plan: true }
      }),
      
      // Torneios por categoria
      prisma.tournament.groupBy({
        by: ['category'],
        _count: { category: true }
      }),
      
      // Transações por status
      prisma.transaction.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      
      // Usuários registrados nos últimos 30 dias
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Torneios criados nos últimos 30 dias
      prisma.tournament.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Top 5 usuários por ganhos
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          totalWinnings: true,
          tournamentsWon: true
        },
        orderBy: { totalWinnings: 'desc' },
        take: 5
      })
    ])

    const [
      totalUsers,
      totalTournaments,
      totalTransactions,
      totalRevenue,
      usersByPlan,
      tournamentsByCategory,
      transactionsByStatus,
      newUsers,
      newTournaments,
      topUsers
    ] = stats

    return NextResponse.json({
      overview: {
        totalUsers,
        totalTournaments,
        totalTransactions,
        totalRevenue: totalRevenue._sum.amount || 0,
        newUsers,
        newTournaments
      },
      charts: {
        usersByPlan,
        tournamentsByCategory,
        transactionsByStatus
      },
      topUsers
    })
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}