import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Verificar se o torneio existe
    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            participations: true
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

    // Verificar se o torneio está ativo
    if (tournament.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Torneio não está mais aceitando inscrições' },
        { status: 400 }
      )
    }

    // Verificar se o torneio ainda tem vagas
    if (tournament._count.participations >= tournament.maxParticipants) {
      return NextResponse.json(
        { error: 'Torneio já está lotado' },
        { status: 400 }
      )
    }

    // Verificar se o usuário já está inscrito
    const existingParticipation = await prisma.tournamentParticipation.findUnique({
      where: {
        userId_tournamentId: {
          userId: session.user.id,
          tournamentId: params.id
        }
      }
    })

    if (existingParticipation) {
      return NextResponse.json(
        { error: 'Você já está inscrito neste torneio' },
        { status: 400 }
      )
    }

    // Verificar se o prazo de inscrição não expirou
    if (new Date() > tournament.deadline) {
      return NextResponse.json(
        { error: 'Prazo de inscrição expirado' },
        { status: 400 }
      )
    }

    // Criar participação
    const participation = await prisma.tournamentParticipation.create({
      data: {
        userId: session.user.id,
        tournamentId: params.id
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    })

    // Atualizar status do torneio se necessário
    const newParticipantCount = tournament._count.participations + 1
    if (newParticipantCount >= tournament.maxParticipants) {
      await prisma.tournament.update({
        where: { id: params.id },
        data: { status: 'FULL' }
      })
    }

    // Criar transação para a taxa de inscrição
    await prisma.transaction.create({
      data: {
        userId: session.user.id,
        tournamentId: params.id,
        type: 'TOURNAMENT_ENTRY',
        amount: tournament.price,
        method: 'PIX',
        description: `Inscrição no torneio ${tournament.title}`,
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      message: 'Inscrição realizada com sucesso',
      participation
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao inscrever no torneio:', error)
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
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Verificar se a participação existe
    const participation = await prisma.tournamentParticipation.findUnique({
      where: {
        userId_tournamentId: {
          userId: session.user.id,
          tournamentId: params.id
        }
      }
    })

    if (!participation) {
      return NextResponse.json(
        { error: 'Você não está inscrito neste torneio' },
        { status: 404 }
      )
    }

    // Verificar se o torneio ainda permite cancelamento
    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id }
    })

    if (!tournament) {
      return NextResponse.json(
        { error: 'Torneio não encontrado' },
        { status: 404 }
      )
    }

    // Não permitir cancelamento se o torneio já começou
    if (tournament.startDate && new Date() > tournament.startDate) {
      return NextResponse.json(
        { error: 'Não é possível cancelar após o início do torneio' },
        { status: 400 }
      )
    }

    // Remover participação
    await prisma.tournamentParticipation.delete({
      where: {
        userId_tournamentId: {
          userId: session.user.id,
          tournamentId: params.id
        }
      }
    })

    // Atualizar status do torneio se necessário
    if (tournament.status === 'FULL') {
      await prisma.tournament.update({
        where: { id: params.id },
        data: { status: 'ACTIVE' }
      })
    }

    return NextResponse.json({
      message: 'Inscrição cancelada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao cancelar inscrição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}