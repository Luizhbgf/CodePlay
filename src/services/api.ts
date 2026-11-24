import axios, { AxiosError } from 'axios'

export class ApiError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL,
  timeout: 8_000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) =>
    Promise.reject(
      new ApiError(
        error.response?.data?.message ?? 'Não foi possível conectar ao serviço.',
        error.response?.status,
      ),
    ),
)

export async function withRetry<T>(operation: () => Promise<T>, attempts = 2): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt <= attempts; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (
        attempt === attempts ||
        (error instanceof ApiError && error.statusCode !== undefined && error.statusCode < 500)
      )
        break
      await new Promise<void>((resolve) => setTimeout(resolve, 150 * (attempt + 1)))
    }
  }
  throw lastError
}
