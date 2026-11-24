import { Sequelize } from 'sequelize'

function databaseConfig(): Sequelize {
  const url = process.env.DATABASE_URL
  if (url)
    return new Sequelize(url, {
      dialect: 'postgres',
      logging: false,
      pool: { max: 10, min: 0, acquire: 30_000, idle: 10_000 },
    })

  const databaseName = process.env.DB_NAME
  const databaseUser = process.env.DB_USER
  const databasePassword = process.env.DB_PASSWORD
  const databaseHost = process.env.DB_HOST
  if (!databaseName || !databaseUser || !databasePassword || !databaseHost) {
    throw new Error('Configure DATABASE_URL ou DB_NAME, DB_USER, DB_PASSWORD e DB_HOST.')
  }
  const port = Number(process.env.DB_PORT ?? 5432)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('DB_PORT inválida.')
  return new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    port,
    dialect: 'postgres',
    logging: false,
    define: { timestamps: true, underscored: true },
    pool: { max: 10, min: 0, acquire: 30_000, idle: 10_000 },
  })
}

export const sequelize = databaseConfig()
