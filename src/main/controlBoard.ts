import { SerialPort, DelimiterParser } from 'serialport'
import { type PortInfo } from '@serialport/bindings-interface'

import { parseVPIdEnvArgs } from './utils/argParsers'
import { logger } from './utils/logger'

interface ControlBoardOptions {
  baudRate: number
}

export class ControlBoard {
  baudRate: number
  serial: SerialPort | undefined
  parser: DelimiterParser

  constructor(opts: ControlBoardOptions = { baudRate: 115200 }) {
    this.baudRate = opts.baudRate

    this.parser = new DelimiterParser({
      delimiter: Buffer.from('\r\n'),
      includeDelimiter: true
    })
  }

  public async findPort(vpidList: Array<Array<string>>): Promise<PortInfo | undefined> {
    const portInfoList = await SerialPort.list()
    for (let i = 0; i < vpidList.length; i++) {
      for (let j = 0; j < portInfoList.length; j++) {
        const currentPort = portInfoList[j]
        const { vendorId, productId } = currentPort

        if (vendorId === vpidList[i][0] && productId === vpidList[i][1]) {
          return currentPort
        }
      }
    }
    return undefined
  }

  public async autodetectPort() {
    const deviceIdList = process.env.VITE_CONTROL_BOARD_VPID_LIST
    if (!deviceIdList) return undefined

    const vpidList = parseVPIdEnvArgs(deviceIdList)
    logger.logInfo('SERIAL PORT AUTODETECTING...')

    const intervalId = setInterval(() => {
      this.findPort(vpidList).then((portInfo) => {
        if (portInfo) {
          logger.logInfo('SERIAL PORT DETECTED', portInfo)

          this.startPort(portInfo.path)
          clearInterval(intervalId)
        }
      })
    }, 1000)
  }

  public startPort(path: string, baudRate = 115200): void {
    this.serial = new SerialPort({ path, baudRate })

    this.read()
  }

  public read(): void {
    if (this.serial) {
      this.serial.pipe(this.parser)
      this.parser.on('data', async (data: Buffer) => {
        console.log(data)
      })
    }
  }

  public async start() {
    this.autodetectPort()
  }
}
