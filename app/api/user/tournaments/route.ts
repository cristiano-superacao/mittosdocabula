import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const participations = await prisma.tournamentParticipation.findMany({
      where: { userId: session.user.id },
      include: {
        tournament: {
          select: {
            id: true,
            title: true,
            category: true,
            prize: true,
            status: true,
            deadline: true,
            startDate: true,
            endDate: true,
          }
        }
      },
      orderBy: {
        joinedAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.tournamentParticipation.count({
      where: { userId: session.user.id }
    })

    return NextResponse.json({
      participations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar torneios do usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}