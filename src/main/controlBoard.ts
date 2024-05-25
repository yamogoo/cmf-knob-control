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
  serialParser: DelimiterParser
  deviceVidPidList: string | undefined

  constructor(
    private logger: Logger,
    opts?: ControlBoardOptions
  ) {
    super()

    this.logger = logger

    this.deviceVidPidList = process.env.VITE_CONTROL_BOARD_VIDPID_LIST

    this.baudRate = opts?.baudRate ?? 115200

    this.serialParser = new DelimiterParser({
      delimiter: Buffer.from('\r\n'),
      includeDelimiter: true
    })
  }

  /**
   *
   * Find serial port by VID:PID from env.list (VITE_CONTROL_BOARD_VIDPID_LIST)
   */
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

  /**
   *
   * Serial port auto detection
   */
  public async autodetectPort() {
    if (!this.deviceVidPidList) return undefined

    const vpidList = parseVPIdEnvArgs(this.deviceVidPidList)
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

  /**
   *
   * Serial port updating path or options
   */
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

  /**
   *
   * Reading serial port data
   */
  public read(): void {
    if (this.serial) {
      this.serial.pipe(this.serialParser)
      this.serialParser.on('data', this.parse)
    }
  }

  /**
   *
   * Parsing serial port data by ATParser
   */
  public parse(data: Buffer) {
    console.log(data.toString('utf-8').trim())
  }

  /**
   *
   * Starting control board
   */
  public start() {
    this.autodetectPort()

    this.on('port-updated', (path) => {
      this.logger.logInfo('SERIAL PORT: device detected', { path })

      this.read()

      this.serial?.on('close', () => {
        this.serialParser.off('data', this.parse)
        this.autodetectPort()
      })
    })
  }
}

export const defineControlBoard = (logger: Logger, opts?: ControlBoardOptions) => {
  return new ControlBoard(logger, opts)
}
