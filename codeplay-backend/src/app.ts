import 'dotenv/config'
import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import { sequelize } from './config/database'
import userRoutes from './routes/userRoutes'
import { requireAdminToken } from './middleware/adminToken'

export const app = express()
app.disable('x-powered-by')
app.use((_request, response, next) => {
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  if (process.env.NODE_ENV === 'production') {
    response.setHeader('Strict-Transport-Security', 'max-age=63072000')
  }
  next()
})
const configuredOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim())
const corsOrigin = configuredOrigins ?? (process.env.NODE_ENV === 'production' ? false : true)
app.use(cors({ origin: corsOrigin }))
app.use(express.json({ limit: '32kb' }))
app.get('/health', (_request, response) => response.status(200).json({ status: 'ok' }))
app.use('/api/users', requireAdminToken, userRoutes)
app.use((_request, response) =>
  response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Rota não encontrada.' } }),
)
app.use(((error: unknown, _request, response, _next) => {
  const message = error instanceof Error ? error.message : 'Erro interno do servidor.'
  if (process.env.NODE_ENV !== 'production') console.error('[api]', message)
  response
    .status(500)
    .json({ error: { code: 'INTERNAL_ERROR', message: 'Ocorreu um erro inesperado.' } })
}) satisfies ErrorRequestHandler)

async function start(): Promise<void> {
  await sequelize.authenticate()
  const port = Number(process.env.PORT ?? 3000)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT inválida.')
  app.listen(port, '0.0.0.0', () => console.warn(`CodePlay API ouvindo na porta ${port}.`))
}

if (require.main === module)
  start().catch((error) => {
    console.error('Falha ao iniciar a API:', error)
    process.exitCode = 1
  })
