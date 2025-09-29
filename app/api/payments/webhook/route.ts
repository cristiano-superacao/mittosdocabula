import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transactionId, status, pixId } = body

    // Verificar se a transação existe
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId }
    })

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transação não encontrada' },
        { status: 404 }
      )
    }

    // Atualizar status da transação
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: status === 'PAID' ? 'COMPLETED' : 'FAILED',
        externalId: pixId,
        updatedAt: new Date()
      }
    })

    // Se o pagamento foi aprovado, atualizar dados do usuário
    if (status === 'PAID') {
      if (transaction.tournamentId) {
        // Confirmar participação no torneio
        await prisma.tournamentParticipation.updateMany({
          where: {
            userId: transaction.userId,
            tournamentId: transaction.tournamentId
          },
          data: {
            // Adicionar campos de confirmação se necessário
          }
        })
      }

      // Registrar log da transação
      await prisma.adminLog.create({
        data: {
          adminId: 'system',
          action: 'PAYMENT_CONFIRMED',
          entity: 'Transaction',
          entityId: transaction.id,
          details: {
            amount: transaction.amount,
            method: transaction.method,
            pixId
          }
        }
      })
    }

    return NextResponse.json({
      message: 'Webhook processado com sucesso',
      transaction: updatedTransaction
    })
  } catch (error) {
    console.error('Erro no webhook PIX:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}