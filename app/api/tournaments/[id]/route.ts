import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id },
      include: {
        participations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                currentRanking: true
              }
            }
          },
          orderBy: {
            joinedAt: 'asc'
          }
        }
      }
    })

    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneio não encontrado' },
        { status: 404 }
      )
    }

    const isUserParticipating = tournament.participations.some(
      p => p.userId === session.user.id
    )

    return NextResponse.json({
      ...tournament,
      participantCount: tournament.participations.length,
      isUserParticipating
    })
  } catch (error) {
    console.error('Erro ao buscar torneio:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    
    const tournament = await prisma.tournament.update({
      where: { id: params.id },
      data: {
        ...body,
        price: body.price ? parseFloat(body.price) : undefined,
        prizeAmount: body.prizeAmount ? parseFloat(body.prizeAmount) : undefined,
        maxParticipants: body.maxParticipants ? parseInt(body.maxParticipants) : undefined,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
      }
    })

    return NextResponse.json(tournament)
  } catch (error) {
    console.error('Erro ao atualizar torneio:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    await prisma.tournament.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Torneio excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir torneio:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}