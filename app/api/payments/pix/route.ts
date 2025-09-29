import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { amount, description, method = 'PIX' } = body

    // Gerar código PIX simulado (em produção, usar API real do banco)
    const pixCode = generatePixCode()
    const pixQrCode = generatePixQrCode(amount, description)
    const pixExpiry = new Date(Date.now() + 30 * 60 * 1000) // 30 minutos

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: 'TOURNAMENT_ENTRY',
        amount: parseFloat(amount),
        method,
        description,
        pixKey: 'mittos@cabula.com',
        pixCode,
        pixQrCode,
        pixExpiry,
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        pixCode: transaction.pixCode,
        pixQrCode: transaction.pixQrCode,
        pixExpiry: transaction.pixExpiry,
        status: transaction.status
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('id')

    if (transactionId) {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: transactionId,
          userId: session.user.id
        }
      })

      if (!transaction) {
        return NextResponse.json(
          { error: 'Transação não encontrada' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        pixCode: transaction.pixCode,
        pixQrCode: transaction.pixQrCode,
        pixExpiry: transaction.pixExpiry
      })
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Erro ao buscar transações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

function generatePixCode(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function generatePixQrCode(amount: number, description: string): string {
  // Em produção, usar biblioteca real para gerar QR Code PIX
  const pixData = {
    amount,
    description,
    key: 'mittos@cabula.com'
  }
  return `data:image/svg+xml;base64,${Buffer.from(JSON.stringify(pixData)).toString('base64')}`
}