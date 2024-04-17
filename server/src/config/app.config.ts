import normalizePort from '@/utils/normalizePort'

const PORT = normalizePort(process.env.PORT || '9002')
const HOST = process.env.HOST || 'localhost'

export default {
  PORT,
  HOST,
  BASE_URL: `http://${HOST}:${PORT}`
}
