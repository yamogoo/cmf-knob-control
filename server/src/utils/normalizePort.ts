/**
 * Normalize a port.
 */

export default function normalizePort(val: string): number | undefined {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return Number(val)
  }

  if (port >= 0) {
    // port number
    return port
  }

  return undefined
}
