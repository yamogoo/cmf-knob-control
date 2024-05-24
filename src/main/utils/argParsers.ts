export const parseEnvArgs = (str: string, opst = { divider: ',' }): Array<string> => {
  const arr = str.split(opst.divider)
  return arr
}

export const parseVPIdEnvArgs = (str: string): Array<Array<string>> => {
  const items = parseEnvArgs(str)

  const arr: Array<Array<string>> = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]

    const args = parseEnvArgs(item, { divider: ':' })
    arr.push(args)
  }

  return arr
}
