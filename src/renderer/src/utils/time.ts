export const getCurrentTime = (): string => {
  const d = new Date()
  return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
}
