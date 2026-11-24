import type { RequestHandler } from 'express'
import { User } from '../models/User'

const publicUserFields = ['user_id', 'username', 'is_active', 'created_at'] as const

export const getAllUsers: RequestHandler = async (_request, response, next) => {
  try {
    const users = await User.findAll({
      attributes: [...publicUserFields],
      limit: 100,
      order: [['created_at', 'DESC']],
    })
    response.status(200).json({ data: users })
  } catch (error) {
    next(error)
  }
}

export const getUserById: RequestHandler = async (request, response, next) => {
  const userId = Number(request.params.id)
  if (!Number.isSafeInteger(userId) || userId < 1) {
    response.status(400).json({
      error: {
        code: 'INVALID_USER_ID',
        message: 'O identificador deve ser um inteiro positivo.',
      },
    })
    return
  }
  try {
    const user = await User.findByPk(userId, { attributes: [...publicUserFields] })
    if (!user) {
      response
        .status(404)
        .json({ error: { code: 'USER_NOT_FOUND', message: 'Usuário não encontrado.' } })
      return
    }
    response.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}
