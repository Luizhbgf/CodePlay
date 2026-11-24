import { timingSafeEqual } from 'node:crypto'
import type { RequestHandler } from 'express'

export const requireAdminToken: RequestHandler = (request, response, next) => {
  const expectedToken = process.env.ADMIN_API_TOKEN
  if (!expectedToken || expectedToken.length < 32) {
    response.status(503).json({
      error: {
        code: 'ADMIN_API_DISABLED',
        message: 'A API administrativa não está configurada.',
      },
    })
    return
  }

  const authorization = request.header('authorization')
  const suppliedToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : ''
  const expected = Buffer.from(expectedToken)
  const supplied = Buffer.from(suppliedToken)
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    response
      .status(401)
      .json({ error: { code: 'UNAUTHORIZED', message: 'Autenticação necessária.' } })
    return
  }
  next()
}
