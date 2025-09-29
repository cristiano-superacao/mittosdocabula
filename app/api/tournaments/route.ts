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
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (status) {
      where.status = status
    } else {
      where.status = { in: ['ACTIVE', 'FULL'] }
    }

    const tournaments = await prisma.tournament.findMany({
      where,
      include: {
        participations: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        },
        _count: {
          select: {
            participations: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.tournament.count({ where })

    return NextResponse.json({
      tournaments: tournaments.map(tournament => ({
        ...tournament,
        participantCount: tournament._count.participations,
        isUserParticipating: tournament.participations.some(
          p => p.userId === session.user.id
        )
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao buscar torneios:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    
    const tournament = await prisma.tournament.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        price: parseFloat(body.price),
        maxParticipants: parseInt(body.maxParticipants),
        prize: body.prize,
        prizeAmount: parseFloat(body.prizeAmount),
        deadline: new Date(body.deadline),
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        rules: body.rules,
        requirements: body.requirements,
        isFeatured: body.isFeatured || false,
      }
    })

    return NextResponse.json(tournament, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar torneio:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}