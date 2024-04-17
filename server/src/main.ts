import 'module-alias/register'

import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server as IOServer, Socket } from 'socket.io'

import { config } from 'dotenv'
config()
config({ path: `.env.local`, override: true })

import appConfig from '@/config/app.config'
import { api } from './api'

const app = express()
const server = http.createServer(app)
const io = new IOServer(server)

io.on('connection', async (socket: Socket) => {
  socket.emit('init')
  socket.on('disconnect', () => {})
})

io.use((_socket, next: () => void): void => {
  // middleWare
  next()
})

app.use(cors)
app.use(api)
server.listen(appConfig.PORT)
