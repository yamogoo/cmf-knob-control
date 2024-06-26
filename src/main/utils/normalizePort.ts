export default function normalizePort(val: string): number | undefined {
  const port = parseInt(val, 10)

  if (isNaN(port)) return Number(val)
  if (port >= 0) return port
  return undefined
}
