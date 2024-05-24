export const createServer = (opts: LocalServerOptions) => {
  return new LocalServer(opts)
}

interface LocalServerOptions {
  host: string
  port: number
}

export class LocalServer {
  public host: string
  public port: number

  constructor(opts: LocalServerOptions) {
    this.host = opts.host
    this.port = opts.port

    this.init()
  }

  public init(): void {
    console.log(`Server started on http://${this.host}:${this.port}`)
  }
}
