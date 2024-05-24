import { SerialPort, DelimiterParser } from 'serialport'
import { EventEmitter } from 'node:events'
import { type PortInfo } from '@serialport/bindings-interface'

import { parseVPIdEnvArgs } from './utils/argParsers'
import { Logger } from './utils/logger'

interface ControlBoardOptions {
  baudRate?: number
  logger: Logger
}

export class ControlBoard extends EventEmitter {
  baudRate: number
  serial: SerialPort | null = null
  parser: DelimiterParser
  logger: Logger

  constructor(opts: ControlBoardOptions) {
    super()

    this.logger = opts.logger

    this.baudRate = opts.baudRate ?? 115200

    this.parser = new DelimiterParser({
      delimiter: Buffer.from('\r\n'),
      includeDelimiter: true
    })
  }

  public async findPort(vpidList: Array<Array<string>>) {
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
    this.logger.logInfo('SERIAL PORT: autodetecting...')

    const intervalId = setInterval(() => {
      this.findPort(vpidList).then((portInfo: PortInfo | undefined) => {
        if (portInfo) {
          this.updateSerialPort(portInfo.path)
          clearInterval(intervalId)
        }
      })
    }, 1000)
  }

  async updateSerialPort(path: string, baudRate = this.baudRate) {
    try {
      this.serial = new SerialPort({ path, baudRate, autoOpen: true }, (error) => {
        if (!error) {
          this.emit('port-updated', path)
          return
        }
      })
    } catch (err) {
      console.error('Error:', err)
    }
  }

  public read(): void {
    if (this.serial) {
      this.serial.pipe(this.parser)
      this.parser.on('data', this.parse)
    }
  }

  public parse(data: Buffer) {
    console.log(data.toString('utf-8').trim())
  }

  public async start() {
    this.autodetectPort()

    this.on('port-updated', (path) => {
      this.logger.logInfo('SERIAL PORT: device detected', { path })

      this.read()

      this.serial?.on('close', () => {
        this.parser.off('data', this.parse)
        this.autodetectPort()
      })
    })
  }
}
