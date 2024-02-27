import express from 'express'
import http from 'http'
import cors from 'cors'
import { api } from './api'
import { Server as IOServer, Socket } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new IOServer(server)

io.on('connection', async (socket: Socket) => {
  socket.emit('init')

  socket.on('disconnect', () => {})
})

io.use((socket, next: () => void): void => {
  // middleWare
  next()
})

app.use(cors)
app.use(api)
server.listen(3000)
