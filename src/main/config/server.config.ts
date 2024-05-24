import normalizePort from '../utils/normalizePort'

const PORT = normalizePort(process.env.PORT || '9000')
const HOST = process.env.HOST || 'localhost'

export default {
  port: PORT,
  host: HOST,
  BASE_URL: `http://${HOST}:${PORT}`
}
